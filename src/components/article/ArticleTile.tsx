import React from "react";
import { Box, Text, Flex, Button } from "@chakra-ui/react";
import parse from "html-react-parser";
import Link from "next/link";

import { removeArticle } from "../../api/article";

import { DeleteIcon } from "@chakra-ui/icons";
interface articleTileProps {
  id: string;
  title: string;
  content: any;
}
const articleTile = ({ id, title, content }: articleTileProps) => {
  const handleDelete = async (e: any) => {
    e.preventDefault();
    const res = await removeArticle(id);
    if (res.status === 200) {
      console.log("Removed succesfully");
    }
  };
  return (
    <Link href={`/addArticle/?articleId=${id}`}>
      <Box
        borderRadius={"10%"}
        bg={"black"}
        color={"white"}
        padding={10}
        maxWidth={"20rem"}
      >
        <Flex justifyContent={"space-between"}>
          <Text fontSize="xl" marginBottom={2} isTruncated>
            {title}
          </Text>
          <Button
            leftIcon={<DeleteIcon />}
            colorScheme="teal"
            variant="solid"
            onClick={handleDelete}
          ></Button>
        </Flex>
        <Text fontSize="sm" isTruncated>
          {parse(content)}
        </Text>
      </Box>
    </Link>
  );
};

export default articleTile;
