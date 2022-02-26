import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import Navbar from "./navBar";
import Image from "next/image";
const Layout = ({ children }: any) => {
  return (
    <div
      style={{ backgroundColor: "black", color: "white", minHeight: "100vh" }}
    >
      <Navbar />
      {children}
      <footer
        style={{
          marginTop: "50px",
          // position: "absolute",
          // width: "100%",
          // bottom: "0",
          // background: "black",
          padding: "20px",
          // right: "50%",
        }}
      >
        <Flex justifyContent={"center"} wrap={"wrap"}>
          <Image
            src="/Sapiens News.jpeg"
            alt="Sapiens news logo"
            width={30}
            height={30}
          />
          <Text>apiens News © 2022</Text>
        </Flex>
      </footer>
    </div>
  );
};

export default Layout;
