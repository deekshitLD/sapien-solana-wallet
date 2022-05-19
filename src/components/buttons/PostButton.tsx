import React from "react";
import { Button } from "@chakra-ui/react";
import { AiOutlineCheckCircle } from "react-icons/ai";

export default function SaveButton() {
  return (
    <Button leftIcon={<AiOutlineCheckCircle color="white" />} variant="red">
      Post
    </Button>
  );
}
