import React from "react";
import { Button } from "@chakra-ui/react";
import { BiSave } from "react-icons/bi";

export default function SaveButton() {
  return (
    <Button leftIcon={<BiSave color="black" />} variant="white">
      Save
    </Button>
  );
}
