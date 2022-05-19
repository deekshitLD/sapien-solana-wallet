import { PublicKey } from "@solana/web3.js";
import axios from "axios";
import config from "../config";

interface signMessageProps {
  publicKey: any;
  message: any;
  signature: any;
}
export const verifyMessage = async ({
  publicKey,
  message,
  signature,
}: signMessageProps) => {
  let response = await axios({
    method: "post",
    url: config.baseURL + "auth/login",
    data: { publicKey, message, signature },
    // responseType: 'stream'
  });
  return response;
};

const sapienTokenMintAddress = new PublicKey(
  "FCrUzx3LzTB58UTew7tCkE7jry93x3Fv8TTPzUwzVNZU"
);

const newsTokenMintAddress = new PublicKey(
  "3qq7ExpwRRAAexGNpUVoFkiTfSB1uo8ezsbyAoxhyryo"
);

export const checkNewsTokenBalance = async (walletAddress: any) => {
  const response = await axios({
    url: `https://api.devnet.solana.com`,
    method: "post",
    headers: { "Content-Type": "application/json" },
    data: [
      {
        jsonrpc: "2.0",
        id: 1,
        method: "getTokenAccountsByOwner",
        params: [
          walletAddress,
          {
            mint: newsTokenMintAddress,
          },
          {
            encoding: "jsonParsed",
          },
        ],
      },
      // {
      //   jsonrpc: "2.0",
      //   id: 1,
      //   method: "getTokenAccountsByOwner",
      //   params: [
      //     walletAddress2,
      //     {
      //       mint: tokenMintAddress2,
      //     },
      //     {
      //       encoding: "jsonParsed",
      //     },
      //   ],
      // },
    ],
  });
  console.log(response);
  return response?.data[0]?.result?.value[0]?.account?.data?.parsed?.info
    ?.tokenAmount.uiAmount;
};

export const checkSapiensTokenBalance = async (walletAddress: any) => {
  const response = await axios({
    url: `https://api.devnet.solana.com`,
    method: "post",
    headers: { "Content-Type": "application/json" },
    data: [
      {
        jsonrpc: "2.0",
        id: 1,
        method: "getTokenAccountsByOwner",
        params: [
          walletAddress,
          {
            mint: sapienTokenMintAddress,
          },
          {
            encoding: "jsonParsed",
          },
        ],
      },
      // {
      //   jsonrpc: "2.0",
      //   id: 1,
      //   method: "getTokenAccountsByOwner",
      //   params: [
      //     walletAddress2,
      //     {
      //       mint: tokenMintAddress2,
      //     },
      //     {
      //       encoding: "jsonParsed",
      //     },
      //   ],
      // },
    ],
  });

  return response?.data[0]?.result?.value[0]?.account?.data?.parsed?.info
    ?.tokenAmount.uiAmount;
};
