import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { listArticles, getArticle } from "../../src/api/article";

import { useToast, Box, Container, Heading, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import Layout from "../../src/components/Layout";
import parse from "html-react-parser";

const Article = () => {
  const router = useRouter();
  const { _id } = router.query;
  const toast = useToast();

  const [articleData, setArticleData] = useState<any>([]);
  useEffect(() => {
    getArticle(_id)
      .then((res: any) => {
        console.log("Res", res.data);
        setArticleData(res.data);
        // setLoading(false);
      })
      .catch((err: any) => {
        toast({
          position: "top",
          title: `${err.message}`,
          description: "Something went wrong.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        // setLoading(false);
      });
  }, []);

  return (
    <Box minHeight={"100vh"} background={"brand.greyDark"} color={"white"}>
      <Container>
        <Heading as={"h1"} mb={3}>
          {articleData.heading}
        </Heading>
        {articleData.owner}
        <Text mt={10}>{parse(articleData.content)}</Text>
      </Container>
    </Box>
  );
};

Article.getLayout = function getLayout(page: NextPage) {
  return <Layout>{page}</Layout>;
};

export default Article;
