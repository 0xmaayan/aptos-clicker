export const APTOS_ACCOUNT_ABI = {
  address: "0x1",
  name: "aptos_account",
  friends: ["0x1::genesis", "0x1::resource_account"],
  exposed_functions: [
    {
      name: "assert_account_exists",
      visibility: "public",
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: ["address"],
      return: [],
    },
    {
      name: "assert_account_is_registered_for_apt",
      visibility: "public",
      is_entry: false,
      is_view: false,
      generic_type_params: [],
      params: ["address"],
      return: [],
    },
    {
      name: "batch_transfer",
      visibility: "public",
      is_entry: true,
      is_view: false,
      generic_type_params: [],
      params: ["&signer", "vector<address>", "vector<u64>"],
      return: [],
    },
    {
      name: "batch_transfer_coins",
      visibility: "public",
      is_entry: true,
      is_view: false,
      generic_type_params: [
        {
          constraints: [],
        },
      ],
      params: ["&signer", "vector<address>", "vector<u64>"],
      return: [],
    },
    {
      name: "can_receive_direct_coin_transfers",
      visibility: "public",
      is_entry: false,
      is_view: true,
      generic_type_params: [],
      params: ["address"],
      return: ["bool"],
    },
    {
      name: "create_account",
      visibility: "public",
      is_entry: true,
      is_view: false,
      generic_type_params: [],
      params: ["address"],
      return: [],
    },
    {
      name: "deposit_coins",
      visibility: "public",
      is_entry: false,
      is_view: false,
      generic_type_params: [
        {
          constraints: [],
        },
      ],
      params: ["address", "0x1::coin::Coin<T0>"],
      return: [],
    },
    {
      name: "set_allow_direct_coin_transfers",
      visibility: "public",
      is_entry: true,
      is_view: false,
      generic_type_params: [],
      params: ["&signer", "bool"],
      return: [],
    },
    {
      name: "transfer",
      visibility: "public",
      is_entry: true,
      is_view: false,
      generic_type_params: [],
      params: ["&signer", "address", "u64"],
      return: [],
    },
    {
      name: "transfer_coins",
      visibility: "public",
      is_entry: true,
      is_view: false,
      generic_type_params: [
        {
          constraints: [],
        },
      ],
      params: ["&signer", "address", "u64"],
      return: [],
    },
  ],
  structs: [
    {
      name: "DirectCoinTransferConfigUpdatedEvent",
      is_native: false,
      abilities: ["drop", "store"],
      generic_type_params: [],
      fields: [
        {
          name: "new_allow_direct_transfers",
          type: "bool",
        },
      ],
    },
    {
      name: "DirectTransferConfig",
      is_native: false,
      abilities: ["key"],
      generic_type_params: [],
      fields: [
        {
          name: "allow_arbitrary_coin_transfers",
          type: "bool",
        },
        {
          name: "update_coin_transfer_events",
          type: "0x1::event::EventHandle<0x1::aptos_account::DirectCoinTransferConfigUpdatedEvent>",
        },
      ],
    },
  ],
} as const;
