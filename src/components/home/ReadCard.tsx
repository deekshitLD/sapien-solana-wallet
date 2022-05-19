/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Box, Heading } from "@chakra-ui/react";

const ReadCard = (props: any) => {
  const { heading, content, author } = props;

  return (
    <Box p="5" maxW="300" bg="brand.greyDark">
      <img
        width={"200px"}
        height={"200px"}
        alt=""
        src={"/Sapiens News.jpeg"}
      ></img>
      <Box>
        <Heading mt="3" size="lg" color="white">
          {heading}
        </Heading>
        <Box
          mt="3"
          fontSize="15"
          color="brand.greyText"
          style={{
            textOverflow: "ellipsis",
            wordWrap: "break-word",
            overflow: "hidden",
            maxHeight: "3.6em",
            lineHeight: "1.8em",
          }}
        >
          {content}
        </Box>
        <Box color="brand.grey" fontWeight={"bold"} mt="3">
          Author: {author}
        </Box>
      </Box>
    </Box>
  );
};

export default ReadCard;