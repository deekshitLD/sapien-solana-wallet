import React from 'react'
import { Text, Flex, Grid, Box, Link, Image } from '@chakra-ui/react'
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
        gridColumn={["1 / 7", "1 / 7", "1 / 7", "1 / 3", "1 / 3"]}
        pl={["8", "8", "8", "24", "24"]}
      >
        <Logo />
        <Text fontSize="medium" mt="4" textAlign="left" lineHeight="22px">
          Sapien.news is a community of unique thinkers and doers who want to
          be part of the decentralised movement worldwide. They are establishing
          this community as a mission to grow the network and really influence
          today’s world.
        </Text>
        <Flex
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          mt="8"
        >
          <Link href="https://discord.gg/hQZmR3V5pn">
            <Box as={FaDiscord} size="22px" color="green" mr="12px" />
          </Link>
          <Link href="https://twitter.com/SapienNews">
            <Box as={FaTwitter} size="22px" color="blue" mr="12px" />
          </Link>
          <Link href="https://www.youtube.com/channel/UCdd-cjlpn13PLg8SG-72YNg">
            <Box as={FaYoutube} size="22px" color="red" />
          </Link>
        </Flex>
      </Flex>

      <Flex
        flexDirection="column"
        alignItems="flex-start"
        gridColumn={["1 / 7", "1 / 7", "1 / 7", "3 / 4", "3 / 4"]}
        paddingX="8"
        mt={["12", "12", "12", "0", "0"]}
      >
        <Text color="#6E64E7" fontWeight="bold" fontSize="20px" mb="8px">
          POWERED BY
        </Text>
        <Text mb="6px" fontStyle="italic" >
          <Image
            src="/logo.ico"
            alt="Solana Logo"
            width="50px"
            height="50px"
            mr="18px"
          />SOLANA</Text>
      </Flex>

      <Flex
        flexDirection="column"
        alignItems="flex-start"
        gridColumn={["1 / 7", "1 / 7", "1 / 7", "4 / 5", "4 / 5"]}
        paddingX={["8", "8", "8", "2", "2"]}
        mt={["12", "12", "12", "0", "0"]}
      >
        <Text color="#6E64E7" fontWeight="bold" fontSize="20px" mb="8px">
          CONTACT US
        </Text>
        <Text mb="6px">Address: Bengaluru, Karnataka</Text>
        <Text>Email: Community@sapien.news</Text>
      </Flex>

      <Flex
        flexDirection="column"
        alignItems="flex-start"
        gridColumn={["1 / 7", "1 / 7", "1 / 7", "5 / 6", "5 / 6"]}
        paddingX={["8", "8", "8", "2", "2"]}
        mt={["12", "12", "12", "0", "0"]}
      >
        <Text color="#6E64E7" fontWeight="bold" fontSize="20px" mb="8px">
        <a target="_blank" href="/Sapien - Whitepaper.pdf">READ OUR WHITEPAPER</a>
        </Text>
        <Text mb="6px">We are Open To Feedback and Suggestions </Text>
      </Flex>
    </Grid>
  );
}

export default Footer