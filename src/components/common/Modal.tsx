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
} from "@chakra-ui/react";

interface InfoModalProps {
  title: string;
  content: any;
  isOpen: boolean;
  onClose: any;
  instructions: any;
}
const InfoModal = ({
  title,
  content,
  isOpen,
  onClose,
  instructions,
}: InfoModalProps) => {
  const { publishArticleInstruction } = instructions;
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
            {content}
            {/* <Heading mb={4} as={"h3"} size={"md"}>
              Initialize Instruction
            </Heading>
            <Flex mb={2}>
              <Input
                value={initializeInstruction}
                isReadOnly
                placeholder="Welcome"
              />
              <Button onClick={onCopy} ml={2}>
                {hasCopied ? "Copied" : "Copy"}
              </Button>
            </Flex> */}
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
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="blue"
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
