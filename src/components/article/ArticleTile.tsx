import React, { useState } from "react";
import { Box, Text, Flex, Button, HStack, useToast } from "@chakra-ui/react";
import parse from "html-react-parser";
import Alert from "../common/Alert";

import { removeArticle } from "../../api/article";
import { IconButton } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import router from "next/router";
interface articleTileProps {
  id: string;
  title: string;
  content: any;
}
const articleTile = ({ id, title, content }: articleTileProps) => {
  const [deleteAlert, setDeleteAlert] = useState(false);
  const toast = useToast();
  const handleDelete = async (e: any) => {
    e.preventDefault();

    const res = await removeArticle(id);
    if (res.status === 200) {
      toast({
        title: "Article deleted.",
        description: "Successfully deleted article.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      console.log("Removed succesfully");
    }
  };
  return (
    <Box
      borderRadius={"15px"}
      bg={"brand.lightBlack"}
      color={"white"}
      padding={10}
      margin={5}
      maxWidth={"15rem"}
      position={"relative"}
      _hover={{
        transform: "scale(1.05)",
        boxShadow: "2px 7px 0.8px 10px #888888 ",
      }}
    >
      <Flex direction={"column"} justifyContent={"space-between"}>
        <Text fontSize="xl" noOfLines={3} marginTop={2} marginBottom={5}>
          {title}
        </Text>
        <Text fontSize="sm" noOfLines={2}>
          {parse(content)}
        </Text>
      </Flex>
      <HStack
        spacing="10px"
        margin={"8px 5px 0 0"}
        position={"absolute"}
        top={0}
        right={0}
      >
        <IconButton
          aria-label={`Edit article ${title}`}
          icon={<EditIcon />}
          onClick={() => {
            router.push(`/addArticle/?articleId=${id}`);
          }}
          colorScheme={"teal"}
          variant="outline"
        />
        <IconButton
          aria-label={`Delete article ${title}`}
          icon={<DeleteIcon />}
          onClick={() => setDeleteAlert((prevValue) => !prevValue)}
          variant="solid"
          colorScheme={"red"}
        />
      </HStack>
      {deleteAlert && (
        <Alert
          title={"Delete Article"}
          dialogue={`Are you sure you want to delete article "${title}" ?`}
          isOpen={deleteAlert}
          confirmBtnLabel={"Delete"}
          setIsOpen={setDeleteAlert}
          onConfirm={handleDelete}
        />
      )}
    </Box>
  );
};

export default articleTile;
