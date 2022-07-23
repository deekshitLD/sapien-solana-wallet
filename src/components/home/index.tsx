/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/link-passhref */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import Link from "next/link";
import { Center, Grid, GridItem, VStack, Heading, useToast } from "@chakra-ui/react";
import { newsFeedArray } from "./newsFeed";
import { AppContext } from "../../context/app";
import { useContext } from "react";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import { useRouter } from "next/dist/client/router";
import { UserContext } from "../HOC/withAuth";
import { publishedArticles } from "../../api/article";

import ReadCard from "./ReadCard";
const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

export default function NewsFeed() {
  const context = useContext(AppContext);
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [publishedArticle, setPublishedAricles] = useState<any>([]);
  const router = useRouter();
  const toast = useToast();

  const { setSelectedNews } = context as any;

  const handleClick = (news: any) => () => {
    wallet(news);
  };

  useEffect(() => {
    publishedArticles()
      .then((res) => {
        console.log(res);
        setPublishedAricles(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const wallet0 = useWallet();
  const { value }: any = useContext(UserContext);
  const [loggedIn, setLoggedIn] = value;
  useEffect(() => {
    if (wallet0.connected && localStorage.getItem("token")) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [wallet0, localStorage]);

  const wallet = async (news: any) => {
    if (!publicKey) throw new WalletNotConnectedError();

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: Keypair.generate().publicKey,
        lamports: 1,
      })
    );

    const signature = await sendTransaction(transaction, connection);

    router.push("/news");
    setSelectedNews(news);

    await connection.confirmTransaction(signature, "processed");
  };

  return (
    <>
      <style>{style}</style>
      <script>
      const notify = ()={
        toast({
          position: "top",
          title: "Connect Wallet to continue",
          // description: "Successfully saved changes.",
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      };
      </script>
      <div className="outer-container">
        {/* <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        > */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto auto auto auto",
          }}
        >
          {publishedArticle.length > 0 &&
            publishedArticle.map((item: any, index: number) => (
              <div key={index}>
                {/* <Center
                key={index}
                bg="black !important"
                color="white"
                padding={10}
                onClick={handleClick(news)}
                className="news-item"
              > */}
                {/* <VStack> */}
                <Link href={loggedIn ? (`/article/${item._id}`) : (`javascript:notify();`)}>
                  <a>
                    <ReadCard
                      heading={item.heading}
                      content={item.content}
                      author={item.owner}
                      image_url={item.image_url}
                      date_publish={(Date() - Date(item.date_publish)).toString()}
                      // img={news.img}
                    />
                  </a>
                </Link>
                {/* <img width="250px" src={`${news.img}`}></img>
                <h3>{news.title}</h3> */}
                {/* </VStack> */}
                {/* </Center> */}
              </div>
            ))}
        </div>
        {/* </Masonry> */}
      </div>
    </>
  );
}

const style = `
  .my-masonry-grid {
    display: -webkit-box; /* Not needed if autoprefixing */
    display: -ms-flexbox; /* Not needed if autoprefixing */
    display: flex;
    margin-left: -30px; /* gutter size offset */
    width: 100%;
  }
  .my-masonry-grid_column {
    padding-left: 30px; /* gutter size */
    background-clip: padding-box;
  }

  /* Style your items */
  .my-masonry-grid_column > div { /* change div to reference your elements you put in <Masonry> */
    background: grey;
    margin-bottom: 30px;
  }

  .outer-container {
    width:100vw;
    padding:30px;
    background-color: #000000;
  }

  .title {
    margin-top:20px;
    background-color:black;
    color:white;
  }

  .news-item {
    background-color:black !important;
    transition: transform 0.2s;
  }

  .news-item:hover {
    transform: scale(1.03);
    cursor:pointer;
  }
`;
