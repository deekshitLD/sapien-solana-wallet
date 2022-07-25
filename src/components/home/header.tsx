import React from 'react'
import { Flex, Grid, Heading } from '@chakra-ui/react'

const Header: React.FC = () => {
  return (
    <Grid
      backgroundImage="../../banner.jpg" 
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      height={['0', '0', '0', '0']}
      templateRows="1fr 1fr 1fr"
    >
    </Grid>
  )
}

export default Header
