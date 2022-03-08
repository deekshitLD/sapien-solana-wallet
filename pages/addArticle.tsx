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
  Container,
  VStack,
  ButtonGroup,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import Editor from "../src/components/article/Editor";

import { NextPage } from "next";
import { useRouter } from "next/router";

import {
  getArticle,
  updateArticle,
  getArticleUnderVoting,
} from "../src/api/article";
import { useWallet } from "@solana/wallet-adapter-react";
import { ObjectID } from "bson";
import Preview from "../src/components/article/Preview";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import Alert from "../src/components/common/Alert";

import { addToSolanaProgram, pushArticleToVoting } from "../src/solanaProgram";
const AddArticle = () => {
  const wallet = useWallet();
  const [content, setContent] = useState("");
  const [heading, setHeading] = useState("");
  const [showUnsavedAlert, setShowUnsavedAlert] = useState(false);
  const [mode, setMode] = useState("Edit");
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

  const checkUnsavedChanges = () => {
    if (content.length > 0 || heading.length > 0) {
      setShowUnsavedAlert(true);
    } else {
      router.push("/articleList");
    }
  };

  const handleSaveAsDraft = async () => {
    // let res = await addArticle();
    if (!content || heading.length <= 0) {
      toast({
        position: "top",
        title: "Cannot save empty article",
        description: "Title and content required.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      if (articleId) {
        const reportAccountPublicKey = await addToSolanaProgram(
          wallet,
          articleId
        );
        const res = await updateArticle({
          id: articleId,
          heading,
          content,
          reportAccountPublicKey,
        });
        if (res.status === 200) {
          toast({
            position: "top",
            title: "Changes saved.",
            description: "Successfully saved changes.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }
      } else {
        const id = new ObjectID();
        const reportAccountPublicKey = await addToSolanaProgram(
          wallet,
          id.toString()
        );
        const res = await updateArticle({
          id: id.toString(),
          heading,
          content,
          reportAccountPublicKey,
        });
        if (res.status === 200) {
          toast({
            position: "top",
            title: "Added article",
            description: "Successfully added article",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          router.query.articleId = id.toString();
          router.push(router);
        } else {
          toast({
            position: "top",
            title: "Error",
            description: "Something went wrong",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }
    }
  };

  const handlePublishForVoting = async () => {
    if (!content || heading.length <= 0) {
      toast({
        position: "top",
        title: "Cannot save empty article",
        description: "Title and content required.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      if (articleId) {
        const res = await pushArticleToVoting(wallet, articleId);

        if (res) {
          toast({
            position: "top",
            title: "Changes saved.",
            description: "Successfully saved changes.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }
      } else {
        const id = new ObjectID();
        const reportAccountPublicKey = await addToSolanaProgram(
          wallet,
          id.toString()
        );
        const res = await updateArticle({
          id: id.toString(),
          heading,
          content,
          reportAccountPublicKey,
        });
        if (res.status === 200) {
          // toast({
          //   position: "top",
          //   title: "Added article",
          //   description: "Successfully added article",
          //   status: "success",
          //   duration: 5000,
          //   isClosable: true,
          // });
          const res = await pushArticleToVoting(wallet, id.toString());
          if (res) {
            toast({
              position: "top",
              title: "Added article",
              description: "Successfully added article",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
            router.query.articleId = id.toString();
            router.push(router);
          } else {
            toast({
              position: "top",
              title: "Error",
              description: "Something went wrong",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          }
        } else {
          toast({
            position: "top",
            title: "Error",
            description: "Something went wrong",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }
    }
  };
  return (
    <>
      <VStack spacing="24px" justifyContent={"center"}>
        <Heading textAlign={"center"}>Start writing </Heading>
        <Flex
          width={"60%"}
          justifyContent={"space-between"}
          flexGrow={1}
          flexBasis={0}
        >
          <Button
            leftIcon={<ArrowLeftIcon />}
            onClick={checkUnsavedChanges}
            style={{ borderRadius: "0.2rem 0 0 0.2rem" }}
          >
            My Articles
          </Button>

          <ButtonGroup variant="outline" spacing="0">
            <Button
              onClick={() => setMode("Preview")}
              variant={mode === "Preview" ? "solid" : "outline"}
              style={{ borderRadius: "2rem 0 0 2rem" }}
            >
              Preview
            </Button>
            <Button
              onClick={() => setMode("Edit")}
              variant={mode === "Edit" ? "solid" : "outline"}
              style={{ borderRadius: "0 2rem 2rem 0" }}
            >
              Edit
            </Button>
          </ButtonGroup>
          {/* <Box></Box> */}
          {/* <Spacer /> */}
        </Flex>
      </VStack>
      <Container maxW="container.lg">
        {mode === "Edit" && (
          <>
            <Input
              margin={"50px 0 50px 0"}
              value={heading}
              placeholder={"Enter article title"}
              onChange={(e) => setHeading(e.target.value)}
            />

            <Box marginBottom={"50px"}>
              <Editor content={content} setContent={setContent} />
            </Box>
          </>
        )}
        {mode === "Preview" && <Preview title={heading} content={content} />}
      </Container>
      <Flex justifyContent={"center"}>
        <Stack direction="row" spacing={4} color={"white"}>
          <Button variant={"outline"} onClick={() => getArticleUnderVoting()}>
            Test
          </Button>
          <Button variant={"outline"} onClick={handleSaveAsDraft}>
            Save as draft
          </Button>
          <Button variant={"solid"} onClick={handlePublishForVoting}>
            Publish for voting
          </Button>
        </Stack>
      </Flex>
      {showUnsavedAlert && (
        <Alert
          title={"Unsaved changes"}
          dialogue={`Are you sure you want to discard unsaved changes and go back?`}
          isOpen={showUnsavedAlert}
          confirmBtnLabel={"Proceed"}
          setIsOpen={setShowUnsavedAlert}
          onConfirm={() => router.push("/articleList")}
        />
      )}
    </>
  );
};

AddArticle.getLayout = function getLayout(page: NextPage) {
  return <Layout>{page}</Layout>;
};
export default AddArticle;
