import React from 'react'
import { Text, Flex, Grid, Box, Link } from '@chakra-ui/react'
import Logo from './logo'
import {
  FaTwitter,
  FaYoutube,
  FaDiscord
} from 'react-icons/fa'

const Footer: React.FC = () => {
  return (
    <Grid as="footer" templateColumns="repeat(6, 1fr)" mt="16" mb="16">
      <Flex
        flexDirection="column"
        alignItems="flex-start"
        gridColumn={['1 / 7', '1 / 7', '1 / 7', '1 / 3', '1 / 3']}
        pl={['8', '8', '8', '24', '24']}
      >
        <Logo />
        <Text fontSize="sm" mt="4" textAlign="left" lineHeight="22px">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s.
        </Text>
        <Flex
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          mt="8"
        >
          <Link href="https://discord.gg/hQZmR3V5pn" ><Box as={FaDiscord} size="22px" color="orange.500" mr="12px" /></Link>
          <Link href="https://twitter.com/SapienNews" ><Box as={FaTwitter} size="22px" color="orange.500" mr="12px" /></Link>
          <Link href="https://www.youtube.com/channel/UCdd-cjlpn13PLg8SG-72YNg"><Box as={FaYoutube} size="22px" color="orange.500" /></Link>
        </Flex>
      </Flex>

      <Flex
        flexDirection="column"
        alignItems="flex-start"
        gridColumn={['1 / 7', '1 / 7', '1 / 7', '3 / 4', '3 / 4']}
        paddingX="8"
        mt={['12', '12', '12', '0', '0']}
      >
        <Text color="orange.500" fontWeight="bold" fontSize="20px" mb="8px">
          Projects
        </Text>
        <Text mb="6px">WHMCS-bridge</Text>
        <Text mb="6px">Search Domain</Text>
        <Text mb="6px">My Account</Text>
        <Text mb="6px">Shopping Cart</Text>
        <Text>Our Shop</Text>
      </Flex>

      <Flex
        flexDirection="column"
        alignItems="flex-start"
        gridColumn={['1 / 7', '1 / 7', '1 / 7', '4 / 5', '4 / 5']}
        paddingX={['8', '8', '8', '2', '2']}
        mt={['12', '12', '12', '0', '0']}
      >
        <Text color="orange.500" fontWeight="bold" fontSize="20px" mb="8px">
          Contact Us
        </Text>
        <Text mb="6px">Address: Bengaluru, Karnataka</Text>
        <Text mb="6px">Phone: +91 #######</Text>
        <Text>Email: SapienNews@Sapien.com</Text>
      </Flex>

      <Flex
        flexDirection="column"
        alignItems="flex-start"
        gridColumn={['1 / 7', '1 / 7', '1 / 7', '5 / 6', '5 / 6']}
        paddingX={['8', '8', '8', '2', '2']}
        mt={['12', '12', '12', '0', '0']}
      >
        <Text color="orange.500" fontWeight="bold" fontSize="20px" mb="8px">
          Read Our Whitepaper
        </Text>
        <Text mb="6px">
          We are Open To Feedback and Suggestions{' '}
        </Text>
      </Flex>
    </Grid>
  )
}

export default Footer