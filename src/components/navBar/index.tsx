import {
  Box,
  HStack,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  Link
} from "@chakra-ui/react";
import { MdSearch } from "react-icons/md";
import NextLink from "next/link";
import React, { useEffect, useContext } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

import { UserContext } from "../HOC/withAuth";

const Navbar = () => {
  const wallet = useWallet();
  const { value }: any = useContext(UserContext);
  const [loggedIn, setLoggedIn] = value;
  useEffect(() => {
    if (wallet.connected && localStorage.getItem("token")) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [wallet, localStorage]);

  return (
    <nav style={{ width: "100%" }}>
      <Flex
        justifyContent={"space-between"}
        background="brand.greyDark"
        padding={"4"}
      >

        <div></div>
        {/* {loggedIn && (
          <>
            <InputGroup maxWidth={"20rem"} alignItems={"center"}>
              <Input placeholder="Search " />
              <InputRightElement
                children={<Icon color={"brand.white"} as={MdSearch} />}
              />
            </InputGroup>
          </>
        )} */}
        <HStack>
          {loggedIn && (
            <>
              <NextLink href="/" passHref>
                <Link color={"brand.white"}> Read</Link>
              </NextLink>
              <NextLink href="/addArticle">
                <Link color="brand.white"> Write </Link>
              </NextLink>
              <NextLink href="/votingList">
                <Link color="brand.white"> Publish</Link>
              </NextLink>
            </>
          )}
          {/* <Link>Connect</Link> */}
          {/* <Box marginRight={"0.5rem"}> */}
          <Box marginRight={"0.5rem"} color={"white"}>
            <WalletMultiButton />
          </Box>
          <WalletDisconnectButton />
          {/* </Box> */}
        </HStack>
      </Flex>
    </nav>
  );
};

export default Navbar;
