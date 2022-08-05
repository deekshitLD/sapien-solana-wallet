//Changed to Component Header and also Routed to Header on Index Page
//Hence This Component is no longer Required
import React, { FC, ChangeEvent, useEffect, useState } from "react";
import {Grid,Center,Select,ButtonProps,Text,Button,ChakraProvider} from "@chakra-ui/react";
import { Paginator,Container,Previous,usePaginator,Next,PageGroup } from "chakra-paginator";

//changed to article here
const fetchArticles = (pageSize: number, offset: number) => {
    return fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${offset}`//Test API for Reference To be Replaced with Real Sapien API
    ).then((res) => res.json());
  };

  const Pagination: FC = () => {
    // react hooks
    //changed to articles here
    const [articlesTotal, setArticlesTotal] = useState<number | undefined>(
      undefined
    );
    //Changed to articles here
    const [articles, setArticles] = useState<any[]>([]);

    // constants
    const outerLimit = 2;
    const innerLimit = 2;

    const {
      isDisabled,
      pagesQuantity,
      currentPage,
      setCurrentPage,
      setIsDisabled,
      pageSize,
      setPageSize,
      offset // you may not need this most of the times, but it's returned for you anyway
    } = usePaginator({
      total: articlesTotal,//changed to articlesTotal here
      initialState: {
      pageSize: 10,
      currentPage: 1,
      isDisabled: false
      }
    });

    // effects
    useEffect(() => {
      fetchArticles(pageSize, offset).then((articles) => { //Parameters changed to articles here
        setArticlesTotal(articles.count);
        setArticles(articles.results);//changed to articles here
      });
    }, [currentPage, pageSize, offset]);

    // styles
    const baseStyles: ButtonProps = {
      w: 7,
      fontSize: "sm"
    };

    const normalStyles: ButtonProps = {
      ...baseStyles,
      _hover: {
        bg: "gray.100",
      },
      bg: "yellow.300"
    };

    const activeStyles: ButtonProps = {
      ...baseStyles,
      _hover: {
        bg: "blue.300"
      },
      bg: "green.300"
    };

    const separatorStyles: ButtonProps = {
      w: 7,
      bg: "yellow.200"
    };

    // handlers
    const handlePageChange = (nextPage: number) => {
      // -> request new data using the page number
      setCurrentPage(nextPage);
      console.log("request new data with ->", nextPage);
    };

    const handlePageSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
      const pageSize = Number(event.target.value);

      setPageSize(pageSize);
    };

    const handleDisableClick = () => {
      return setIsDisabled((oldState) => !oldState);
    };

    return (
      <ChakraProvider>
        <Paginator
          isDisabled={isDisabled}
          activeStyles={activeStyles}
          innerLimit={innerLimit}
          currentPage={currentPage}
          outerLimit={outerLimit}
          normalStyles={normalStyles}
          separatorStyles={separatorStyles}
          pagesQuantity={pagesQuantity}
          onPageChange={handlePageChange}
        >
          <Container align="center" justify="space-between" w="full" p={4}>
            <Previous>
              Previous
              {/* Or an icon from `react-icons` */}
            </Previous>
            <PageGroup isInline align="center" />
            <Next>
              Next
              {/* Or an icon from `react-icons` */}
            </Next>
          </Container>
        </Paginator>
        <Center w="full">
          <Button onClick={handleDisableClick}>Disable ON / OFF</Button>
          <Select w={40} ml={3} onChange={handlePageSizeChange}>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </Select>
        </Center>
        {/* This is the current page that is showing the Grid of Pokemon To be changed to sapien news*/}
        <Grid
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(5, 1fr)"
          gap={3}
          px={20}
          mt={20}
        >
          {articles?.map(({ name }) => ( //changed to articles here
            <Center p={4} bg="#3d38d6" key={name}>
              <Text>{name}</Text>
            </Center>
          ))}
        </Grid>
      </ChakraProvider>
    );
  };

  export default Pagination;




