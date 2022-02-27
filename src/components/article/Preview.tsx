import React from "react";
import parse from "html-react-parser";
import { Container, Heading, Box } from "@chakra-ui/react";

interface PreviewProps {
  title: string;
  content: any;
}
const Preview = ({ title, content }: PreviewProps) => {
  return (
    <Container
      maxW="container.lg"
      style={{
        border: "2px solid #805ad5",
        padding: "3rem",
        margin: "2rem",
      }}
    >
      <Heading as="h1" textAlign={"center"}>
        {title}
      </Heading>
      <Box alignItems={"center"}>{parse(content)}</Box>
    </Container>
  );
};

export default Preview;
