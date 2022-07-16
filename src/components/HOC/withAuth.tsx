import React, { useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";

const protectedRoutes = [
  "/addArticle",
  "/articleList",
  "/faucet",
  "/votingList",
];
import { Box, Flex, Spacer, Text, useToast } from "@chakra-ui/react";

import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { verifyMessage } from "../../api/auth";

export const UserContext = createContext({});

const WithAuth = (props: any) => {
  const wallet = useWallet();
  const router = useRouter();
  const toast = useToast();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (wallet.disconnecting) {
      localStorage.removeItem("token");
    }

    if (wallet.connecting) {
      try {
        // `publicKey` will be null if the wallet isn't connected
        if (!wallet.publicKey) throw new Error("Wallet not connected!");
        // `signMessage` will be undefined if the wallet doesn't support it
        if (!wallet.signMessage)
          throw new Error("Wallet does not support message signing!");

        // Encode anything as bytes
        const message = new TextEncoder().encode("Login with wallet");
        // Sign the bytes using the wallet

        wallet
          .signMessage(message)
          .then((sig) => {
            verifyMessage({
              // @ts-ignore
              publicKey: wallet.publicKey.toBytes(),
              message: message,
              signature: sig,
            }).then((res: any) => {
              localStorage.clear();
              localStorage.setItem("token", res.data.authToken);
              setLoggedIn(true);
              toast({
                position: "top",
                title: "Login successful.",
                // description: "Successfully saved changes.",
                status: "success",
                duration: 5000,
                isClosable: true,
              });
              console.log("loggin");
            });
            console.log("then");
          })
          .catch((err: any) => {
            console.log("catch");
            wallet.disconnect();
            toast({
              position: "top",
              title: "Signing message is needed for login",
              // description: "Successfully saved changes.",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          });
        console.log("publicKey", message.toString());

        // Verify that the bytes were signed using the private key that matches the known public key

        // alert(`Message signature: ${bs58.encode(signature)}`);
      } catch (error: any) {
        console.log(`Signing failed on A: ${error}`);
      }
    }
  }, [wallet]);

  useEffect(() => {
    if (protectedRoutes.includes(router.pathname)) {
      if (!wallet.connected || !localStorage.getItem("token")) {
        router.push("/");
      }
    }
  }, [router.pathname, wallet]);

  return (
    <>
      {" "}
      <UserContext.Provider value={{ value: [loggedIn, setLoggedIn] }}>
        {props.children}
      </UserContext.Provider>
    </>
  );
};

export default WithAuth;
