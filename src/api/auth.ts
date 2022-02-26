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
