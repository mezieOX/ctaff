import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Textarea,
} from "@chakra-ui/react";
import { useRef } from "react";
import { ColorRing } from "react-loader-spinner";

interface DialogueModalInterface {
  isOpen: boolean;
  onClose: any;
  dialogueModalMessage: string;
  handleDialogueModalMessage: any;
  handleDialogueMessageSend: any;
  isSending: boolean;
}

function DialogueModal({
  isOpen,
  onClose,
  dialogueModalMessage,
  handleDialogueModalMessage,
  handleDialogueMessageSend,
  isSending,
}: DialogueModalInterface) {
  const initialRef = useRef(null);

  return (
    <>
      <Modal
        isCentered
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
        closeOnOverlayClick={false}
      >
        {/* <ModalOverlay /> */}
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalHeader>Feedback message (optional)</ModalHeader>
          <ModalCloseButton isDisabled={isSending} />
          <ModalBody pb={6}>
            <Textarea
              value={dialogueModalMessage}
              onChange={handleDialogueModalMessage}
              placeholder="Give in a brief message you'd want to send to this teacher"
              resize="none"
              size="lg"
            />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleDialogueMessageSend}
              isDisabled={isSending}
            >
              {!isSending && "Send"}
              {isSending && <ColorRing width={30} height={30} />}
            </Button>
            <Button onClick={onClose} isDisabled={isSending}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DialogueModal;
