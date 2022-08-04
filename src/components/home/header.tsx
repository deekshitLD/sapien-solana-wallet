import React from 'react'
import { Flex, Grid, Heading } from '@chakra-ui/react'

const Header: React.FC = () => {
  return (
    <Grid
      backgroundImage="/banner.jpg" 
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      height={['59vh']}
      width={['auto']}
      templateRows="1fr 1fr 1fr"
    >
      <Flex
        flexDirection="column"
        gridRow="3 / 3"
        paddingX={['1.5em', '1.5em', '1.5em', '15%']}
        margin="auto"
      >
        <Heading
          as="h2"
          fontSize={['2xl', '3xl', '4xl', '5xl', '5xl']}
          color="white"
          mb="3"
          width="fit-content"
          text-align="center"
          paddingX={['4px', '12px', '12px', '16px', '24px']}
          paddingY={['4px', '4px', '12px', '12px', '12px']}
        >
          Be Crypto Aware<br/>Be a Crypto Sapien
        </Heading>
        <Heading
          as="h3"
          fontSize={['lg', 'lg', '2xl', '2xl', '2xl']}
          color="black"
          bg="#F52929"
          width="fit-content"
          paddingX={['24px', '24px', '30px', '30px', '30px']}
          paddingY={['8px', '8px', '14px', '14px', '14px']}
          margin={['20px']}
        >
          Join the waitlist
        </Heading>
      </Flex>
    </Grid>
  )
}

export default Header
