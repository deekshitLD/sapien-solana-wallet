import React from "react";
import { Box, Flex, Spacer } from "@chakra-ui/react";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

const Navbar = () => {
  return (
    <>
      <nav>
        <Flex bg="white" padding={"1.5rem"}>
          <Box>Logo</Box>
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
