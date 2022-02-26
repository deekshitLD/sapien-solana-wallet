import React, { useState, useEffect } from "react";
import Layout from "../src/components/Layout";
import {
  Box,
  Button,
  Stack,
  Heading,
  Flex,
  Input,
  useToast,
} from "@chakra-ui/react";
import Editor from "../src/components/article/Editor";

import { NextPage } from "next";
import { useRouter } from "next/router";

import { getArticle, updateArticle } from "../src/api/article";
import { ObjectID } from "bson";
const AddArticle = () => {
  const [content, setContent] = useState({});
  const [heading, setHeading] = useState("");
  const router = useRouter();
  const toast = useToast();

  const { articleId } = router.query;

  useEffect(() => {
    articleId
      ? getArticle(articleId).then((res) => {
          console.log(res);
          setHeading(res.data.heading);
          setContent(res.data.content);
        })
      : "";
  }, []);

  const handleSaveAsDraft = async () => {
    // let res = await addArticle();
    if (articleId) {
      const res = await updateArticle({ id: articleId, heading, content });
      if (res.status === 200) {
        toast({
          title: "Changes saved.",
          description: "Successfully saved changes.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      const id = new ObjectID();
      updateArticle({ id: id.toString(), heading, content });
      router.query.articleId = id.toString();
      router.push(router);
    }
  };
  const handlePublishForVoting = () => {
    console.log("Publish for voting");
  };
  return (
    <>
      <Heading textAlign={"center"}>Start writing article</Heading>
      <Box padding={5}>
        <Input
          value={heading}
          placeholder={"Enter article title"}
          onChange={(e) => setHeading(e.target.value)}
        />
      </Box>
      <Box padding={20}>
        <Editor content={content} setContent={setContent} />
      </Box>
      <Flex justifyContent={"center"}>
        <Stack direction="row" spacing={4}>
          <Button variant={"outline"} onClick={handleSaveAsDraft}>
            Save as draft
          </Button>
          <Button variant={"outline"} onClick={handlePublishForVoting}>
            Publish for voting
          </Button>
        </Stack>
      </Flex>
    </>
  );
};

AddArticle.getLayout = function getLayout(page: NextPage) {
  return <Layout>{page}</Layout>;
};
export default AddArticle;
