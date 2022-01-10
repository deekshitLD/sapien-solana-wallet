/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { useContext } from "react";
import { AppContext } from "../../context/app";
import { Box, Center, Heading } from "@chakra-ui/react";

export default function Index() {
  const context = useContext(AppContext);

  const { selectedNews } = context as any;

  console.log(selectedNews);

  return (
    <>
      <style scoped>{style}</style>
      <Box width="80vw" margin="auto">
        <Heading mt="20px">{selectedNews.title}</Heading>
        <Center margin="20px">{<img src={`${selectedNews.img}`}></img>}</Center>
        <Center mb="100px" mt="20px">
          {selectedNews.description}
        </Center>
      </Box>
    </>
  );
}

const style = `
    body {
        background-color: #222;
        color:white;
    }
`;
