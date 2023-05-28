import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

interface OrderTeachModalInterface {
    isOpen: boolean;
    onClose: any;
}

const OrderTeachModal = ({
  isOpen,
  onClose,
}: OrderTeachModalInterface) => {
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay
        bg="none"
        backdropFilter="auto"
        backdropInvert="80%"
        backdropBlur="2px"
      />
      <ModalContent p="1rem">
        <ModalHeader>Order Successful!</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* <Text>Custom backdrop filters!</Text> */}
          <Alert
            status="success"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="300px"
            // position="absolute"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Order submitted!
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              Thanks for submitting your Order 😀. Our team will follow you up with a mail concerning your order shortly.
            </AlertDescription>
          </Alert>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
 
export default OrderTeachModal;