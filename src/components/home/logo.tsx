import React from 'react'

import { Heading, Text } from '@chakra-ui/react'

const Logo: React.FC = () => {
  return (
    <>
      <Heading as="h1" size="lg" color="orange.500" textTransform="uppercase">
        <Text display="inline" fontWeight="extrabold">
          Sapien
        </Text>{' '}
        <Text display="inline" fontWeight="medium">
          News
        </Text>
      </Heading>
    </>
  )
}

export default Logo
