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
  Spinner,
} from "@chakra-ui/react";
import Editor from "../src/components/article/Editor";

import { NextPage } from "next";
import { useRouter } from "next/router";

import {
  getArticle,
  updateArticle,
  getArticleUnderVoting,
} from "../src/api/article";
import * as walletAdapter from "@solana/wallet-adapter-react";
import { ObjectID } from "bson";
import Preview from "../src/components/article/Preview";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import Alert from "../src/components/common/Alert";

import InfoModal from "../src/components/common/Modal";
import {
  addToSolanaProgram,
  pushArticleToVoting,
  initializeArticleAccount,
  publishingWithStakeandNFT,
} from "../src/solanaProgram";
import {
  useAnchorWallet,
  useWallet,
  WalletContextState,
} from "@solana/wallet-adapter-react";

import { sendInstruction } from "../src/solanaProgram/governance/transactionInstruction";
import { PublicKey } from "@solana/web3.js";

import { checkSapiensTokenBalance } from "../src/api/auth";
import SaveButton from "../src/components/buttons/SaveButton";
import PostButton from "../src/components/buttons/PostButton";

const AddArticle = () => {
  const wallet = walletAdapter.useWallet();
  console.log("Wallet adapter is ", walletAdapter);
  console.log(
    "USE wallet is",
    useWallet(),
    "useAnchorWallet is ",
    useAnchorWallet()
  );

  const today = new Date();
  const [content, setContent] = useState("");
  const [heading, setHeading] = useState("");
  const [loading, setLoading] = useState(true);
  const [reportAccountPublicKey, setReportAccountPublicKey] = useState<any>();
  const [articleStatus, setArticleStatus] = useState("");
  const [showUnsavedAlert, setShowUnsavedAlert] = useState(false);
  const [mode, setMode] = useState("Edit");
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [instructions, setInstructions] = useState({});

  const router = useRouter();
  const toast = useToast();

  const { articleId } = router.query;

  console.log("AddArticle - 78");

  useEffect(() => {
    articleId
      ? getArticle(articleId).then((res) => {
          console.log(res);
          setHeading(res.data.heading);
          setContent(res.data.content);
          setReportAccountPublicKey(res.data.reportAccountPublicKey);
          setArticleStatus(res.data.status);
          setLoading(false);
        })
      : setLoading(false);
  }, []);

  useEffect(() => {
    if (articleStatus === "VOTING") {
      setMode("Preview");
    }
  }, [articleStatus]);
  const checkUnsavedChanges = () => {
    if (
      articleStatus === "DRAFT" &&
      (content.length > 0 || heading.length > 0)
    ) {
      setShowUnsavedAlert(true);
    } else if (!articleId && (content.length > 0 || heading.length > 0)) {
      setShowUnsavedAlert(true);
    } else {
      router.push("/articleList");
    }
  };
 // Listener with a priority 4 will be executed before priority 5.


  const handleSaveAsDraft = async () => {
    // let res = await addArticle();
    const res = await checkSapiensTokenBalance(wallet.publicKey);
    console.log("Sapien token balance is", res);
    if (res == undefined) {
      toast({
        position: "top",
        title: "Insufficient Sapiens token balance",
        description: "You need News token to pulish article. Use faucet :)",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    } else {
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
//          await updateOrAddArticle(wallet, articleId, reportAccountPublicKey);
          const res = await updateArticle({
            id: articleId,
            heading,
            content,
            reportAccountPublicKey,
          });

          console.log("articleID:",articleId);

          if (res.status === 200) {
            toast({
              position: "top",
              title: "Changes saved.",
              description: "Successfully saved changes.",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
            router.push("/articleList");
          }
        } else {
          console.log("NEW ARTICLE, generating id.....");
          const id = new ObjectID();
          const TempreportAccountPublicKey = await initializeArticleAccount(
            wallet,
            id
          );
          console.log(
            "Report account public key generated",
            TempreportAccountPublicKey
          );

          console.log(
            "ID Generated",
            id.toString()
          );

          setReportAccountPublicKey(TempreportAccountPublicKey);

//          await updateOrAddArticle(wallet, id, TempreportAccountPublicKey);

          const res = await updateArticle({
            id: id.toString(),
            heading,
            content,
            reportAccountPublicKey: TempreportAccountPublicKey,
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
            router.push("/articleList");
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
        const res = await updateArticle({
          id: articleId,
          heading,
          content,
          date_publish: today.toUTCString(),
          reportAccountPublicKey,
        });
        if (res.status === 200) {
          const status = await pushArticleToVoting(
            wallet,
            articleId,
            reportAccountPublicKey
          );
          if (status) {
            toast({
              position: "top",
              title: "Added article",
              description: "Successfully added article",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
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
      } else {
        const id = new ObjectID();

        const TempreportAccountPublicKey = await initializeArticleAccount(
          wallet,
          id
        );
        setReportAccountPublicKey(TempreportAccountPublicKey);

        const res = await updateArticle({
          id: id.toString(),
          heading,
          content,
          date_publish: today.toUTCString(),
          reportAccountPublicKey: TempreportAccountPublicKey,
        });
        if (res.status === 200) {
          const status = await pushArticleToVoting(
            wallet,
            id.toString(),
            TempreportAccountPublicKey
          );
          if (status) {
            toast({
              position: "top",
              title: "Added article",
              description: "Successfully added article",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
            router.query.articleId = id.toString();
            router.push("/articleList");
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

  const handlePublishArticle = async (
    wallet: WalletContextState,
    reportAccountPublicKey: any,
    articleId: string | string[]
  ) => {

    if(reportAccountPublicKey.charAt(0) == "/"){
      reportAccountPublicKey  = await initializeArticleAccount(wallet, articleId);
      const status = await publishingWithStakeandNFT(
        wallet,
        articleId,
        reportAccountPublicKey
      );
        const res = await updateArticle({
        id: articleId,
        reportAccountPublicKey: reportAccountPublicKey.toString(),
        date_publish: today.toUTCString(),
      });
      console.log("addarticle 340");
      console.log("here is the",res);
    }else{
      reportAccountPublicKey = new PublicKey(reportAccountPublicKey);
      const status = await publishingWithStakeandNFT(
        wallet,
        articleId,
        reportAccountPublicKey
      );
      console.log("addarticle 348");
    }


    if (status) {
      toast({
        position: "top",
        title: "Added article",
        description: "Successfully added article",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      router.push("/votingList");
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

    // const res: any = await sendInstruction(
    //   wallet,
    //   reportAccountPublicKey,
    //   articleId
    // );
    // setInstructions(res);
    // setShowInfoModal(true);
  };

  const closeInfoModal = () => {
    setShowInfoModal(false);
  };
  return (
    <>
      <VStack
        spacing="24px"
        justifyContent={"center"}
        background={"brand.greyDark"}
        color={"white"}
      >
        <Heading textAlign={"center"}>Start writing </Heading>
        <Flex
          width={"60%"}
          justifyContent={"space-between"}
          flexGrow={1}
          flexBasis={0}
          background={"brand.greyDark"}
        >
          {/* <Button
            leftIcon={<ArrowLeftIcon />}
            onClick={checkUnsavedChanges}
            style={{ borderRadius: "0.2rem 0 0 0.2rem" }}
          >
            Article list
          </Button> */}
          {/* 
          <ButtonGroup variant="outline" spacing="0">
            {(articleStatus === "DRAFT" || !articleId) && (
              <>
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
              </>
            )}
          </ButtonGroup> */}
          {/* <Box></Box> */}
          {/* <Spacer /> */}
        </Flex>
      </VStack>
      <Container maxW="container.lg" background={"brand.greyDark"}>
        {loading && (
          <>
            <div style={{ margin: "auto" }}>
              <Spinner size="xl" />
            </div>
          </>
        )}
        {mode === "Edit" && (articleStatus === "DRAFT" || !articleId) && (
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
          {((articleId && articleStatus === "DRAFT") || !articleId) && (
            <>
              <SaveButton onClickFunction={handleSaveAsDraft} />
              {/* <Button variant={"outline"} onClick={handleSaveAsDraft}>
                Save as draft
              </Button> */}
              <PostButton onClickFunction={handlePublishForVoting} />
              {/* <Button variant={"solid"} onClick={handlePublishForVoting}>
                Publish for voting
              </Button> */}
            </>
          )}

          {articleId && articleStatus === "VOTING" && (
            <Button
              onClick={() => {
                handlePublishArticle(wallet, reportAccountPublicKey, articleId);
              }}
            >
              Publish
            </Button>
          )}
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
      {showInfoModal && (
        <InfoModal
          title="Instructions to publish"
          // content={
          //   "Please go to governance by clicking 'Go to vote' below. Connect wallet and deposit you Sapien tokens. Then click on program with id 'F8nQoxzzpdxyZy9EcK8yoPiEZHjYdixWhPUe4xaVwoHd'."
          // }
          isOpen={showInfoModal}
          onClose={closeInfoModal}
          instructions={instructions}
        />
      )}
    </>
  );
};

AddArticle.getLayout = function getLayout(page: NextPage) {
  return <Layout>{page}</Layout>;
};
export default AddArticle;
