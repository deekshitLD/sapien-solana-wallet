import React, { useState, useEffect } from "react";
import { Button, Flex, Heading, useToast } from "@chakra-ui/react";
import Link from "next/link";
import { AddIcon } from "@chakra-ui/icons";
import ArticleTile from "../src/components/article/ArticleTile";
import { listArticles } from "../src/api/article";

import { NextPage } from "next";
import Layout from "../src/components/Layout";
import { Spinner } from "@chakra-ui/react";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const toast = useToast();
  useEffect(() => {
    listArticles()
      .then((res: any) => {
        setArticles(res.data);
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
      });
  }, []);
  return (
    <Flex flexDirection={"column"} padding={20}>
      <Heading textAlign={"center"}>Your articles</Heading>
      <Flex justifyContent={"flex-end"} marginTop={20} marginBottom={10}>
        <Link href="/addArticle">
          <Button leftIcon={<AddIcon />} variant={"solid"}>
            {" "}
            Add a new article
          </Button>
        </Link>
      </Flex>
      <Flex alignItems={"stretch"} wrap={"wrap"}>
        {console.log(articles)}
        {articles.length > 0 ? (
          articles.map((item: any) => {
            return (
              <ArticleTile
                key={item._id}
                id={item._id}
                title={item.heading}
                content={item.content}
              />
            );
          })
        ) : (
          <>
            <div style={{ margin: "auto" }}>
              <Spinner size="xl" />
            </div>
          </>
        )}
      </Flex>
    </Flex>
  );
};

ArticleList.getLayout = function getLayout(page: NextPage) {
  return <Layout>{page}</Layout>;
};
export default ArticleList;
