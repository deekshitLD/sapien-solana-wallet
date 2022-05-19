import React from "react";
import { Button, Box } from "@chakra-ui/react";
import { AiOutlineInfoCircle } from "react-icons/ai";

export default function KnowMoreButton() {
  return (
    <Button
      leftIcon={<AiOutlineInfoCircle color="white" />}
      variant="transparent"
    >
      Know more
    </Button>
  );
}
