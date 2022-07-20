import React, { useState } from "react";
import {
  Box,
  Text,
  Flex,
  Button,
  VStack,
  useToast,
  Center,
  HStack,
} from "@chakra-ui/react";
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
  articleUnderVote: any;
  image_url: string;
}
const ArticleTile = ({
  id,
  title,
  content,
  articleUnderVote,
  image_url,
}: articleTileProps) => {
  const [deleteAlert, setDeleteAlert] = useState(false);
  const toast = useToast();

  const handleDelete = async (e: any) => {
    e.preventDefault();

    const res = await removeArticle(id);
    if (res.status === 200) {
      router.push("/articleList");
      toast({
        position: "top",
        title: "Article deleted.",
        description: "Successfully deleted article.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setDeleteAlert(false);
      console.log("Removed succesfully");
    }
  };
  return (
    <HStack
      alignItems={"flex-start"}
      padding={5}
      _hover={{
        // transform: "scale(1.01)",
        border: "1px solid black",
        cursor: "pointer",
        borderRadius: "50px",
      }}
    >
      {!articleUnderVote && (
        <VStack
          spacing="10px"
          margin={"10px 1px 0 0"}
          // position={"absolute"}

          zIndex={2}
        >
          <IconButton
            aria-label={`Edit article ${title}`}
            icon={<EditIcon />}
            onClick={() => {
              router.push(`/addArticle/?articleId=${id}`);
            }}
            colorScheme={"teal"}
            variant="solid"
          />
          <IconButton
            aria-label={`Delete article ${title}`}
            icon={<DeleteIcon />}
            onClick={() => setDeleteAlert((prevValue) => !prevValue)}
            variant="solid"
            colorScheme={"red"}
          />
        </VStack>
      )}
      <Box
        borderRadius={"15px"}
        bg={"brand.lightBlack"}
        color={"white"}
        padding={10}
        // margin={5}
        maxWidth={"15rem"}
        maxHeight={"15rem"}
        minHeight={"15rem"}
        minWidth={"15rem"}
        overflow="hidden"
        position={"relative"}
        onClick={() => {
          router.push(`/addArticle/?articleId=${id}`);
        }}
      >
        <Flex direction={"column"} justifyContent={"space-between"}>
          <img
            width={"200px"}
            height={"200px"}
            alt=""
            src={image_url}
          ></img>
          <Text fontSize="xl" noOfLines={3} marginTop={2} marginBottom={5}>
            {title}
          </Text>
          <Text fontSize="sm" noOfLines={2}>
            {parse(content)}
          </Text>
        </Flex>

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
    </HStack>
  );
};

export default ArticleTile;
