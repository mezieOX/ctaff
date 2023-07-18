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
import { ColorRing } from "react-loader-spinner";

interface ConfimationDialogueInterface {
  isOpen: boolean;
  onOpen: any;
  onClose: any;
  handleSubmit: any;
  order?: boolean;
  isSending?: boolean;
}

export default function ConfimationDialogue({isOpen, onOpen, onClose,handleSubmit, order, isSending}: ConfimationDialogueInterface) {
//   const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  return (
    <>
      {/* <Button onClick={onOpen}>Discard</Button> */}
      <AlertDialog
        closeOnOverlayClick={false}
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{order? "Place Order?": "Save Details?"}</AlertDialogHeader>
          <AlertDialogCloseButton isDisabled={isSending} />
          <AlertDialogBody>{order? "Are you sure you want to place this order?": "Are you sure of all these details?"}</AlertDialogBody>
          <AlertDialogFooter>
            <Button isDisabled={isSending} ref={cancelRef} onClick={onClose} >
              {order? "Cancel": "No"}
            </Button>
            <Button isDisabled={isSending} colorScheme="red" ml={3} onClick={handleSubmit}>
              {order? "Proceed": "Yes"}
              {isSending && <ColorRing width={30} height={30} />}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
