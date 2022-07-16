import React from 'react'

import { Heading, Text } from '@chakra-ui/react'

const Logo: React.FC = () => {
  return (
    <>
      <Heading as="h1" size="lg" color="#6E64E7" textTransform="uppercase">
        <Text display="inline" fontWeight="extrabold">
          Sapien
        </Text>{' '}
        <Text display="inline" fontWeight="extrabold">
          News
        </Text>
      </Heading>
    </>
  )
}

export default Logo
