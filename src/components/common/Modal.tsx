import React, { ReactEventHandler } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useClipboard,
  Flex,
  Input,
  Divider,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";

interface InfoModalProps {
  title: string;
  //   content: any;
  isOpen: boolean;
  onClose: any;
  instructions: any;
}
const InfoModal = ({
  title,
  //   content,
  isOpen,
  onClose,
  instructions,
}: InfoModalProps) => {
  const { publishArticleInstruction, initializeInstruction } = instructions;
  const { hasCopied: hasCopiedInitialize, onCopy: onCopyInitialize } =
    useClipboard(initializeInstruction);
  const { hasCopied: hasCopiedPublished, onCopy: onCopyPublished } =
    useClipboard(publishArticleInstruction);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={3} mb={8}>
              <Text fontSize="lg">
                ℹ️ Please go to governance by clicking 'Go to vote' below.{" "}
              </Text>
              <Text fontSize={"lg"}>
                ℹ️ Connect wallet and deposit you Sapien tokens.
              </Text>
              <Text fontSize={"lg"}>
                {" "}
                ℹ️ Select program with id
                'F8nQoxzzpdxyZy9EcK8yoPiEZHjYdixWhPUe4xaVwoHd'.
              </Text>
              <Text fontSize={"lg"}>
                ℹ️ Click on Add a new proposal, enter article details and Add
                proposal
              </Text>
              <Text fontSize={"lg"}>
                ℹ️ Paste Instruction 1 and save then paste instruction 2 and
                save.
              </Text>
              <Text fontSize={"lg"}>
                {" "}
                ℹ️ Click on Sign off proposal to push it to governance. Vote on
                your proposal to puclish or censor the selected article
              </Text>
            </Stack>

            <Heading mb={4} as={"h3"} size={"md"}>
              Initialize Instruction
            </Heading>
            <Flex mb={2}>
              <Input
                value={initializeInstruction}
                isReadOnly
                placeholder="Welcome"
              />
              <Button onClick={onCopyInitialize} ml={2}>
                {hasCopiedInitialize ? "Copied" : "Copy"}
              </Button>
            </Flex>
            <Divider />
            <Heading mt={5} as={"h3"} size={"md"}>
              Publish article Instruction
            </Heading>
            <Flex mt={4} mb={2}>
              <Input
                value={publishArticleInstruction}
                isReadOnly
                placeholder="Welcome"
              />
              <Button onClick={onCopyPublished} ml={2}>
                {hasCopiedPublished ? "Copied" : "Copy"}
              </Button>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              variant={"outline"}
              onClick={() =>
                window.open(
                  "https://realms-explorer.com/#/realm/GeDmakjLUeEgLsLD6LfL8iBQ5T6qeiuMEXbzj7LGgTnZ?programId=GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw"
                )
              }
            >
              Go to Vote
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InfoModal;
