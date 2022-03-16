import React, { useState, useEffect } from "react";
import { Button, Flex, Heading, useToast } from "@chakra-ui/react";
import Link from "next/link";
import { AddIcon } from "@chakra-ui/icons";
import ArticleTile from "../src/components/article/ArticleTile";
import { listArticles, getArticleUnderVoting } from "../src/api/article";

import { checkSapiensTokenBalance } from "../src/api/auth";

import * as walletAdapter from "@solana/wallet-adapter-react";

import { NextPage } from "next";
import Layout from "../src/components/Layout";
import { Spinner } from "@chakra-ui/react";

const ArticleList = () => {
  const [articlesInDraft, setArticlesInDraft] = useState([]);
  const [articlesUnderVote, setArticlesUnderVote] = useState([]);

  const [userHasSapienToken, setUserHasSapienToken] = useState(false);

  const wallet: any = walletAdapter.useWallet();
  const { publicKey } = wallet;
  const toast = useToast();

  useEffect(() => {
    listArticles()
      .then((res: any) => {
        setArticlesInDraft(res.data);
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

  useEffect(() => {
    if (wallet.connected)
      checkSapiensTokenBalance(wallet.publicKey).then((balance) => {
        if (balance > 0) {
          setUserHasSapienToken(true);
        } else {
          setUserHasSapienToken(false);
        }
      });
  }, [wallet]);

  useEffect(() => {
    if (userHasSapienToken) {
      getArticleUnderVoting().then((res: any) => {
        setArticlesUnderVote(res.data.articles);
      });
    }
  }, [userHasSapienToken]);
  return (
    <Flex flexDirection={"column"} padding={20}>
      <Heading textAlign={"center"}>Article list</Heading>
      <Flex justifyContent={"flex-end"} marginTop={20} marginBottom={10}>
        <Link href="/addArticle">
          <Button leftIcon={<AddIcon />} variant={"solid"}>
            {" "}
            Add a new article
          </Button>
        </Link>
      </Flex>
      <Heading as={"h4"}>Articles under draft</Heading>
      <Flex alignItems={"stretch"} wrap={"wrap"}>
        {console.log(articlesInDraft)}
        {articlesInDraft.length > 0 ? (
          articlesInDraft.map((item: any) => {
            return (
              <ArticleTile
                key={item._id}
                id={item._id}
                title={item.heading}
                content={item.content}
                userHasSapienToken={userHasSapienToken}
                articleUnderVote={false}
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
      <Heading as={"h4"}>Articles under vote</Heading>
      <Flex alignItems={"stretch"} wrap={"wrap"}>
        {console.log("Articles under vote ", articlesUnderVote)}
        {articlesUnderVote?.length > 0 ? (
          articlesUnderVote.map((item: any) => {
            return (
              <ArticleTile
                key={item._id}
                id={item._id}
                title={item.heading}
                content={item.content}
                userHasSapienToken={userHasSapienToken}
                articleUnderVote={true}
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
