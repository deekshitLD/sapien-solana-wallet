import { PublicKey } from "@solana/web3.js";
import axios from "axios";
import config from "../config";

export const requestNewsTokenFromFaucet = async () => {
  let response = await axios({
    method: "get",
    url: config.baseURL + "faucet/request/news",

    // responseType: 'stream'
  });
  return response;
};

export const requestSapienTokenFromFaucet = async () => {
  let response = await axios({
    method: "get",
    url: config.baseURL + "faucet/request/sapien",

    // responseType: 'stream'
  });
  return response;
};
