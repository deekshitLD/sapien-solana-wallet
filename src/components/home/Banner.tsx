import React from "react";
import { Box, ButtonGroup, Heading, Text } from "@chakra-ui/react";
import ReadButton from "../buttons/ReadButton";
import KnowMoreButton from "../buttons/KnowMoreButton";

const Banner = () => {
  return (
    <Box className={"banner"} width={"100%"} height={"100%"} minHeight={"80vh"}>
      <Box padding={10} width={"25%"} mt={100}>
        <Heading>Sapiens</Heading>
        <Text>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled
        </Text>
        <ButtonGroup mt={"10"}>
          <ReadButton />
          <KnowMoreButton />
        </ButtonGroup>
      </Box>
    </Box>
  );
};

export default Banner;
