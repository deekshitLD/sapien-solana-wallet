import React from "react";
import { Button } from "@chakra-ui/react";
import { BsFillPlayFill } from "react-icons/bs";

export default function ReadButton() {
  return (
    <Button
      leftIcon={<BsFillPlayFill color="black" />}
      variant="white"
      color={"black"}
    >
      Read now
    </Button>
  );
}
