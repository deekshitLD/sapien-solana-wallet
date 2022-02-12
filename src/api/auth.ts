import axios from "axios";
import config from "../config";

interface signMessageProps {
  publicKey: any;
  message: any;
  signature: any;
}
export const verifyMessage = ({
  publicKey,
  message,
  signature,
}: signMessageProps) => {
  axios({
    method: "post",
    url: config.baseURL + "auth/login",
    data: { publicKey, message, signature },
    // responseType: 'stream'
  }).then(function (response) {
    console.log(response);
  });
};
