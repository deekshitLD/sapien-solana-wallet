import {
  Box,
  HStack,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  Image,
  Link
} from "@chakra-ui/react";
import { MdSearch } from "react-icons/md";
import NextLink from "next/link";
import React, { useEffect, useContext } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

import {
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
        background={"#000000"}
        padding={"4"}
      >
        <div>
        <a href="https://sapien.news">
        <Image
              src="/SapienNews.jpeg"
              alt="Sapiens news logo"
              width={12}
              height={12}
              style={{float:'left'}}
            /><span style={{position:'relative',fontWeight:900,fontSize:20,top:10}}>apien News</span></a></div>
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
          <Box marginRight={"0.5rem"} background={"#E6E8E6"}>
            <WalletMultiButton />
          </Box>
          {/* </Box> */}
        </HStack>
      </Flex>
    </nav>
  );
};

export default Navbar;
