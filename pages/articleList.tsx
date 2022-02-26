import React, { useState, useEffect } from "react";
import { Button, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { AddIcon } from "@chakra-ui/icons";
import ArticleTile from "../src/components/article/ArticleTile";
import { listArticles } from "../src/api/article";

import { NextPage } from "next";
import Layout from "../src/components/Layout";

const articleList = () => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    listArticles().then((res: any) => {
      setArticles(res.data);
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
      <Flex alignItems={"stretch"} justifyContent={"space-between"}>
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
          <>Loading...</>
        )}
      </Flex>
    </Flex>
  );
};

articleList.getLayout = function getLayout(page: NextPage) {
  return <Layout>{page}</Layout>;
};
export default articleList;
