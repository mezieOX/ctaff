import { Box } from "@chakra-ui/react";
import Image from "next/image";

const CardImage = () => {
  return (
    <Box position="relative" height="10rem" width="10rem" mr="auto">
      <Image src="/images/contact.svg" layout="fill" alt="contact-image" />
    </Box>
  );
};

export default CardImage;
