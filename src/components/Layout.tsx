import { Flex } from "@chakra-ui/react";
import React from "react";
import Navbar from "./navBar";
const Layout = ({ children }: any) => {
  return (
    <>
      <Navbar />
      {children}
      <footer style={{ marginTop: "50px" }}>
        <Flex justifyContent={"center"}>Sapiens News © 2022</Flex>
      </footer>
    </>
  );
};

export default Layout;
