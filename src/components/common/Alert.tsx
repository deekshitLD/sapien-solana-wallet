import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

interface AlertProps {
  title: string;
  dialogue: string;
  confirmBtnLabel: string;
  isOpen: boolean;
  setIsOpen: Function;
  onConfirm: React.MouseEventHandler<HTMLButtonElement> | undefined;
}
const Alert = ({
  title,
  dialogue,
  confirmBtnLabel,
  isOpen,
  setIsOpen,
  onConfirm,
}: AlertProps) => {
  const cancelRef = React.useRef(null);
  const onClose = () => setIsOpen(false);
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{dialogue}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant={"solid"}
              colorScheme="red"
              onClick={onConfirm}
              ml={3}
            >
              {confirmBtnLabel}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default Alert;
