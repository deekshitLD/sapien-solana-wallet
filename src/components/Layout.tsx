import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";
import Navbar from "./navBar";
import Image from "next/image";
import { useRouter } from "next/router";
const Layout = ({ children }: any) => {
  const router = useRouter();

  return (
    <div
      style={{ backgroundColor: "#111119", color: "white", minHeight: "100vh" }}
    >
      <Navbar />
      {/* <Button onClick={() => router.back()}>Back</Button> */}
      {children}
      <footer
        style={{
          // position: "absolute",
          // margin: "50px auto 0 auto",

          // width: "100%",
          // bottom: "0",
          // background: "#1E1E1E",
          // padding: "20px",
          // left: 0,
          // right: 0,
          // textAlign: "center",
          // right: "50%",
        }}
      >
        <Flex
          justifyContent={"left"}
          textAlign={"justify"}
          wrap={"wrap"}
          style={
            {
              // top: "50%",  /* position the top  edge of the element at the middle of the parent */
              // left: "50%" /* position the left edge of the element at the middle of the parent */,
              // transform: "translate(-50%, -50%)",
            }
          }
        >
          {/* <Stack spacing={3}>
            <Text fontSize="4xl" color="brand.white">
              Foundation
            </Text>
            <Text fontSize="3xl" color="brand.grey">
              Country
            </Text>
            <Text fontSize="3xl" color="brand.grey">
              Media regulation
            </Text>
            <Text fontSize="3xl" color="brand.grey">
              Our Mission
            </Text>
          </Stack> */}
        </Flex>
      </footer>
    </div>
  );
};

export default Layout;
