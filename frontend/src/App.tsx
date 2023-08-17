import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import "./style.css";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import logo from "./logo.png";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createClient, createEntryPayload } from "@thalalabs/surf";
import { AptosAccount, Network, Provider } from "aptos";
import { ABI } from "./abi";
import { COIN_ABI } from "./coin-abi";
import { APTOS_ACCOUNT_ABI } from "./aptos-account-abi";
import { ACCOUNT_ABI } from "./account-abi";

const NETWORK =
  import.meta.env.REACT_APP_NETWORK === "mainnet"
    ? Network.MAINNET
    : Network.TESTNET;
const provider = new Provider(NETWORK);
const client = createClient({
  nodeUrl: provider.aptosClient.nodeUrl,
});
const internalAccount = new AptosAccount();

function App() {
  const { account, signAndSubmitTransaction } = useWallet();
  const queryClient = useQueryClient();
  const count = useQuery(
    ["count"],
    async () => {
      const countResource = await client.useABI(ABI).view.count({
        type_arguments: [],
        arguments: [],
      });
      return countResource[0];
    },
    {
      refetchInterval: 500,
    }
  );
  const balance = useQuery(
    ["balance", internalAccount.address()],
    async () => {
      const balanceResource = await client.useABI(COIN_ABI).view.balance({
        type_arguments: ["0x1::aptos_coin::AptosCoin"],
        arguments: [internalAccount.address().toString() as any],
      });
      return balanceResource[0];
    },
    {
      refetchInterval: 5000,
    }
  );
  useQuery(
    ["click"],
    async () => {
      if (balance.data && balance.data > 0n) {
        const payload = createEntryPayload(ABI, {
          function: "click",
          type_arguments: [],
          arguments: [],
        }).rawPayload;
        await provider.aptosClient.signAndSubmitTransaction(
          internalAccount,
          await provider.aptosClient.generateTransaction(
            internalAccount.address(),
            payload,
            {
              max_gas_amount: "10000",
              gas_unit_price: "100",
            }
          )
        );
      }
    },
    {
      refetchInterval: 500,
    }
  );
  return (
    <>
      <div className="navbar">
        <div className="navbar-text">Aptos Clicker</div>
        <div>
          <WalletSelector />
        </div>
      </div>
      <div className="center-container">
        <h1>{count.data?.toString()}</h1>
        <img
          onClick={async () => {
            if (!account) {
              return alert("Please connect wallet first.");
            }
            const internalAccountResource = await client
              .useABI(ACCOUNT_ABI)
              .view.exists_at({
                type_arguments: [],
                arguments: [internalAccount.address().toString() as any],
              });

            // Create Account if not exists
            if (internalAccountResource[0] === false) {
              const payload = createEntryPayload(APTOS_ACCOUNT_ABI, {
                function: "create_account",
                type_arguments: [],
                arguments: [internalAccount.address().toString() as any],
              }).rawPayload;
              await signAndSubmitTransaction({
                type: "entry_function_payload",
                ...payload,
              });
            }

            // Mint if balance is less than 1000000
            const MIN_BALANCE = 1000000;
            if (!balance.data || balance.data < MIN_BALANCE) {
              const payload = createEntryPayload(COIN_ABI, {
                function: "transfer",
                type_arguments: ["0x1::aptos_coin::AptosCoin"],
                arguments: [
                  internalAccount.address().toString() as any,
                  MIN_BALANCE * 10,
                ],
              }).rawPayload;
              await signAndSubmitTransaction({
                type: "entry_function_payload",
                ...payload,
              });
            }

            // Click
            const payload = createEntryPayload(ABI, {
              function: "click",
              type_arguments: [],
              arguments: [],
            }).rawPayload;
            await provider.aptosClient.signAndSubmitTransaction(
              internalAccount,
              await provider.aptosClient.generateTransaction(
                internalAccount.address(),
                payload,
                {
                  max_gas_amount: "10000",
                  gas_unit_price: "100",
                }
              )
            );

            // Refetch
            await queryClient.invalidateQueries(["count"]);
          }}
          className="center-image"
          src={logo}
          alt="aptos"
        />
      </div>
    </>
  );
}

export default App;
