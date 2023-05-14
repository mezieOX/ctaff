import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { AnyKindOfDictionary } from "lodash";
import { useRef } from "react";

interface ConfimationDialogueInterface {
  isOpen: boolean;
  onOpen: any;
  onClose: any;
  handleSubmit: any;
}

export default function ConfimationDialogue({isOpen, onOpen, onClose,handleSubmit}: ConfimationDialogueInterface) {
//   const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  return (
    <>
      {/* <Button onClick={onOpen}>Discard</Button> */}
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}

        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Save Details?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>Are you sure of all these details?</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>

              No
            </Button>
            <Button colorScheme="red" ml={3} onClick={handleSubmit}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
