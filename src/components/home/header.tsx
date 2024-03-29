import React from 'react'
import { Flex, Grid, Heading } from '@chakra-ui/react'

const Header: React.FC = () => {
  return (
    <Grid
      backgroundImage="/banner.jpg" 
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      height={['45vh']}
      width={['auto']}
      templateRows="1fr 1fr 1fr"
    >
      <Flex
        flexDirection="column"
        gridRow="3 / 3"
        paddingX={['1.5em', '1.5em', '1.5em', '15%']}
      >
        <Heading
          as="h2"
          fontSize={['2xl', '3xl', '4xl', '5xl', '5xl']}
          fontFamily={"Blanka"}
          fontWeight={"500"}
          color="white"
          mb="3"
          width="fit-content"
          paddingX={['0px', '0px', '0px', '0px', '0px']}
          paddingY={['4px', '4px', '12px', '12px', '12px']}
        >
          Press for Crypto Sapiens
        </Heading>
        <a href="https://forms.gle/g3jTbSboHDNNfz9H6" target="_blank" rel="noreferrer">
        <Heading
          as="h3"
          fontSize={['lg', 'lg', '2xl', '2xl', '2xl']}
          fontWeight={"700"}
          color="black"
          borderRadius={"3"}
          bg="#FDCA40"
          width="fit-content"
          paddingX={['12px', '12px', '23px', '23px', '23px']}
          paddingY={['8px', '8px', '14px', '14px', '14px']}
          marginBottom={['7vh']}
        >
          Join the waitlist
        </Heading>
        </a>
      </Flex>
    </Grid>
  )
}

export default Header
