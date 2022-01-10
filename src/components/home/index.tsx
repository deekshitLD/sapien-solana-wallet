/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/link-passhref */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import Masonry from "react-masonry-css";
import Link from "next/link";
import { Center, VStack } from "@chakra-ui/react";
import { newsFeedArray } from "./newsFeed";
import { AppContext } from "../../context/app";
import { useContext } from "react";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

export default function NewsFeed() {
  const context = useContext(AppContext);

  const { setSelectedNews } = context as any;

  const handleClick = (news: any) => () => {
    setSelectedNews(news);
  };

  return (
    <>
      <style>{style}</style>
      <div className="outer-container">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {newsFeedArray.map((news: any, index: number) => (
            <Link key={index} href="/news">
              <Center
                bg="black !important"
                color="white"
                padding={10}
                onClick={handleClick(news)}
                className="news-item"
              >
                <VStack>
                  <img width="250px" src={`${news.img}`}></img>
                  <h3>{news.title}</h3>
                </VStack>
              </Center>
            </Link>
          ))}
        </Masonry>
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
    width: auto;
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
    height:100vh;
    padding:30px;
    background-color:#222;
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
