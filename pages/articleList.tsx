import React, { useState, useEffect } from "react";
import {
  Button,
  Flex,
  Heading,
  useToast,
  Text,
  Divider,
  Box,
  Center,
} from "@chakra-ui/react";
import Link from "next/link";
import { AddIcon } from "@chakra-ui/icons";
import ArticleTile from "../src/components/article/ArticleTile";
import { listArticles, getArticleUnderVoting } from "../src/api/article";

import { checkSapiensTokenBalance } from "../src/api/auth";

import * as walletAdapter from "@solana/wallet-adapter-react";

import { NextPage } from "next";
import Layout from "../src/components/Layout";
import { Spinner } from "@chakra-ui/react";

import Image from "next/image";

const ArticleList = () => {
  const [articlesInDraft, setArticlesInDraft] = useState([]);
  const [articlesUnderVote, setArticlesUnderVote] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userHasSapienToken, setUserHasSapienToken] = useState(false);

  const wallet: any = walletAdapter.useWallet();
  const { publicKey } = wallet;
  const toast = useToast();

  useEffect(() => {
    listArticles()
      .then((res: any) => {
        setArticlesInDraft(res.data);
        setLoading(false);
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
        setLoading(false);
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
        setLoading(false);
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
      <Heading as={"h2"} size="lg" textAlign={"center"} mb={10}>
        Under draft
      </Heading>
      <Flex
        // width={"100%"}
        alignItems={"flex-start"}
        // wrap={"wrap"}
        // mb={10}
        justifyItems={"flex-start"}
        justifyContent={"space-evenly"}
      >
        {console.log(articlesInDraft)}
        {articlesInDraft.length > 0 &&
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
          })}

        {articlesInDraft.length === 0 && loading === false && (
          <>
            <Flex
              justifyItems={"center"}
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
              // wrap={"wrap"}
              textAlign="center"
              margin={"auto"}
            >
              <div
                style={{
                  borderRadius: "50%",
                  overflow: "hidden",
                  // width: "70%",
                  background: "white",
                  marginRight: "20px",
                  opacity: 0.75,
                }}
              >
                <Image
                  src="/no-articles.png"
                  alt="No articles"
                  width={140}
                  height={150}
                />
              </div>
              <Text fontSize="xl" color={"gray.400"} mb={10}>
                Nothing here
              </Text>
            </Flex>
          </>
        )}
        {loading && (
          <Center>
            <Spinner size={"xl"} />
          </Center>
        )}
      </Flex>
      <Divider />
      {userHasSapienToken && (
        <>
          <Heading as={"h2"} size="lg" textAlign={"center"} mt={10} mb={10}>
            Under voting
          </Heading>
          <Flex alignItems={"stretch"} wrap={"wrap"}>
            {console.log("Articles under vote ", articlesUnderVote)}
            {articlesUnderVote?.length > 0 &&
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
              })}
            {articlesUnderVote?.length === 0 && loading === false && (
              <>
                <Flex
                  justifyItems={"baseline"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  flexDirection={"column"}
                  // wrap={"wrap"}
                  textAlign="center"
                  margin={"auto"}
                >
                  <Box
                    style={{
                      borderRadius: "50%",
                      overflow: "hidden",
                      background: "white",
                      marginRight: "20px",
                      opacity: 0.76,
                    }}
                  >
                    <Image
                      src="/no-articles.png"
                      alt="No articles"
                      width={140}
                      height={150}
                    />
                  </Box>
                  <Text fontSize="xl" color={"gray.400"} mb={10}>
                    Nothing here
                  </Text>
                </Flex>
              </>
            )}
            {loading && (
              <Center>
                <Spinner size={"xl"} />
              </Center>
            )}
          </Flex>
        </>
      )}
    </Flex>
  );
};

ArticleList.getLayout = function getLayout(page: NextPage) {
  return <Layout>{page}</Layout>;
};
export default ArticleList;
