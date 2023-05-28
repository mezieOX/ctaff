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
  Image
} from '@chakra-ui/react'
import {useRef} from "react"
import { ColorRing } from "react-loader-spinner";

interface PreviewCertificationModalInterface {
    isOpen: boolean;
    onClose: any;
    fileUrl: string;
}

function PreviewCertificationModal({
  isOpen,
  onClose,
  fileUrl
}: PreviewCertificationModalInterface) {

  return (
    <>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent bg="inherit" >
          <ModalBody>
            <Image
              rounded="lg"
              width="100%"
              height="100%"
              src={fileUrl}
              alt="teacher"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default PreviewCertificationModal