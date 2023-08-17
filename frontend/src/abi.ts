export const ABI = {
  address: "0x3062c225b6dcbc50024174ff4261bb9e5334a0c2bcbafa73fa2a6e7f2d9939",
  name: "clicker",
  friends: [],
  exposed_functions: [
    {
      name: "click",
      visibility: "public",
      is_entry: true,
      is_view: false,
      generic_type_params: [],
      params: [],
      return: [],
    },
    {
      name: "count",
      visibility: "public",
      is_entry: false,
      is_view: true,
      generic_type_params: [],
      params: [],
      return: ["u64"],
    },
  ],
  structs: [
    {
      name: "Count",
      is_native: false,
      abilities: ["key"],
      generic_type_params: [],
      fields: [{ name: "count", type: "u64" }],
    },
  ],
} as const;
