import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import React, { FC, useCallback } from "react";
import { sign } from "tweetnacl";

import { verifyMessage } from "../../api/auth";

export const SignMessageButton: FC = () => {
  const { publicKey, signMessage } = useWallet();

  const onClick = useCallback(async () => {
    try {
      // `publicKey` will be null if the wallet isn't connected
      if (!publicKey) throw new Error("Wallet not connected!");
      // `signMessage` will be undefined if the wallet doesn't support it
      if (!signMessage)
        throw new Error("Wallet does not support message signing!");

      // Encode anything as bytes
      const message = new TextEncoder().encode("Hello, world!");
      // Sign the bytes using the wallet
      const signature = await signMessage(message);
      console.log("publicKey", message.toString());

      // Verify that the bytes were signed using the private key that matches the known public key
      let res = await verifyMessage({
        publicKey: publicKey.toBytes(),
        message: message,
        signature: signature,
      });
      localStorage.setItem("token", res.data.authToken);

      alert(`Message signature: ${bs58.encode(signature)}`);
    } catch (error: any) {
      alert(`Signing failed: ${error?.message}`);
    }
  }, [publicKey, signMessage]);

  return signMessage ? (
    <button
      onClick={onClick}
      disabled={!publicKey}
      style={{ background: "red" }}
    >
      Sign Message
    </button>
  ) : null;
};
