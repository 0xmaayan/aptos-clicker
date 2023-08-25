import React from "react";
import ReactDOM from "react-dom/client";
import {
  AptosWalletAdapterProvider,
  NetworkName,
} from "@aptos-labs/wallet-adapter-react";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { FewchaWallet } from "fewcha-plugin-wallet-adapter";
import { MartianWallet } from "@martianwallet/aptos-wallet-adapter";
import { PontemWallet } from "@pontem/wallet-adapter-plugin";
import { RiseWallet } from "@rise-wallet/wallet-adapter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  IdentityConnectWallet,
  IdentityConnectWalletConfig,
} from "@identity-connect/wallet-adapter-plugin";
import { Buffer as BufferPolyFill } from "buffer";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

const identityConnectDappId = "f3d4af75-6a1d-47da-b32e-4dd7305ebcb6";

window.Buffer = BufferPolyFill;

const wallets = [
  new IdentityConnectWallet(identityConnectDappId),
  new PetraWallet(),
  new FewchaWallet(),
  new MartianWallet(),
  new PontemWallet(),
  new RiseWallet(),
];

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AptosWalletAdapterProvider
        plugins={wallets}
        autoConnect={true}
        onError={(error) => {
          console.log("Custom error handling", error);
        }}
      >
        <App />
      </AptosWalletAdapterProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
