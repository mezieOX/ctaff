import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import { Box, Flex, Text } from "@chakra-ui/react";
import { HiLocationMarker } from "react-icons/hi";

const MediaAndText = () => {
  return (
    <Box marginRight="auto">
      <Flex
        color="white"
        flexDir="column"
        gap={5}
        listStyleType="none"
        marginTop={4}
      >
        <Flex gap={4} alignItems="center">
          <PhoneIcon />
          <Text fontSize=".9rem">+234 703 0822 450</Text>
        </Flex>
        <Flex gap={4} alignItems="center">
          <EmailIcon />
          <Text fontSize=".9rem">Someone@gmail.com</Text>
        </Flex>
        <Flex gap={4} alignItems="center">
          <HiLocationMarker />
          <Text fontSize=".9rem">Lagos, Nigeria</Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default MediaAndText;
