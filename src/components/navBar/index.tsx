import React from "react";
import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

import Image from "next/image";
import Link from "next/link";
const Navbar = () => {
  return (
    <>
      <nav>
        <Flex bg="white" padding={"1.5rem"}>
          <Link href="/">
            <Flex alignItems={"flex-end"}>
              <Image
                src="/Sapiens News.jpeg"
                alt="Sapiens news logo"
                width={50}
                height={50}
              />
              <Text fontSize="xl"> apiens News</Text>
            </Flex>
          </Link>
          <Spacer />
          <Box marginRight={"0.5rem"}>
            <WalletMultiButton />
          </Box>
          <Box>
            <WalletDisconnectButton />
          </Box>
        </Flex>
      </nav>
    </>
  );
};

export default Navbar;
