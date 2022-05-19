import {
  Box,
  HStack,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
} from "@chakra-ui/react";
import { MdSearch } from "react-icons/md";
import NextLink from "next/link";
import React from "react";
import { Link } from "@chakra-ui/react";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

const Navbar = () => {
  return (
    <nav style={{ width: "100%" }}>
      <Flex
        justifyContent={"space-between"}
        background="brand.greyDark"
        padding={"4"}
      >
        <div></div>
        <InputGroup maxWidth={"20rem"} alignItems={"center"}>
          <Input placeholder="Search " />
          <InputRightElement
            children={<Icon color={"brand.white"} as={MdSearch} />}
          />
        </InputGroup>
        <HStack>
          <NextLink href="/" passHref>
            <Link color={"brand.white"}> Read</Link>
          </NextLink>
          <NextLink href="/">
            <Link color="brand.white"> Write </Link>
          </NextLink>
          <NextLink href="/publish">
            <Link color="brand.white"> Publish</Link>
          </NextLink>
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
