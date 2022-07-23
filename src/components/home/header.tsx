import React from 'react'
import { Flex, Grid, Heading } from '@chakra-ui/react'

const Header: React.FC = () => {
  return (
    <Grid
      backgroundImage="url(https://res.cloudinary.com/dg0isdwpe/image/upload/v1654933037/Sapien%20News/banner1_hnp89w.png)" 
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      height={['60vh', '60vh', '60vh', '70vh']}
      templateRows="1fr 1fr 1fr"
    >
      <Flex
        flexDirection="column"
        gridRow="3 / 3"
        paddingX={['1.5em', '1.5em', '1.5em', '15%']}
      >
        <Heading
          as="h2"
          fontSize={['4xl', '5xl', '6xl', '6xl', '6xl']}
          color="white"
          mb="3"
          width="fit-content"
          paddingX={['4px', '12px', '12px', '16px', '24px']}
          paddingY={['4px', '4px', '12px', '12px', '16px']}
        >
          Decentralized News
        </Heading>
        <Heading
          as="h3"
          fontSize={['lg', 'lg', '2xl', '2xl', '2xl']}
          textTransform="uppercase"
          color="black"
          bg="white"
          width="fit-content"
          paddingX={['24px', '24px', '30px', '30px', '30px']}
          paddingY={['8px', '8px', '14px', '24px', '14px']}
        >
          Quality Crypto News no Noise
        </Heading>
      </Flex>
    </Grid>
  )
}

export default Header
