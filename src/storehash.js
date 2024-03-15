export const address = "0x0d24d7fc53951f5401e863fed55cffe9d952c5ef";
export const abi = [
  {
    constant: false,
    inputs: [
      {
        name: "x",
        type: "string",
      },
    ],
    name: "setHash",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getHash",
    outputs: [
      {
        name: "x",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];
