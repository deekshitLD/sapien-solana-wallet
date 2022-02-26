import React, { useState, useEffect } from "react";
import Layout from "../src/components/Layout";
import { Box, Container, Stack, Heading, Flex, Input } from "@chakra-ui/react";
import Editor from "../src/components/article/Editor";

import ArticleAddButton from "../src/components/article/ArticleAddButton";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { Button } from "../src/styles/Button";
import { getArticle } from "../src/api/article";

const AddArticle = () => {
  const [content, setContent] = useState({});
  const [heading, setHeading] = useState("");
  const router = useRouter();

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
          <ArticleAddButton
            mode={"draft"}
            title={"Save as draft"}
            data={{ heading, content }}
          />
          <ArticleAddButton
            mode={"final"}
            title={"Publish for voting"}
            data={{ heading, content }}
          />
        </Stack>
      </Flex>
    </>
  );
};

AddArticle.getLayout = function getLayout(page: NextPage) {
  return <Layout>{page}</Layout>;
};
export default AddArticle;
