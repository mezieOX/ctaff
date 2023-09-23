import { Box, Flex } from "@chakra-ui/react";
import { BsFacebook, BsTwitter } from "react-icons/bs";

import React from "react";
import { EmailIcon } from "@chakra-ui/icons";
const MediaIcon = () => {
  return (
    <Box>
      <Flex
        color="white"
        position="absolute"
        flexDir="column"
        top="20"
        right="0"
        bg="#584FF2"
        width="4rem"
        borderLeftRadius={20}
        p="5"
        gap={4}
        _hover={{ visibility: "visible" }}
        marginTop={{ base: 10, md: 14 }}
        marginBottom={{ base: 6, md: 0 }}
      >
        <Flex
          alignItems="center"
          justify="center"
          borderRadius={50}
          h="2rem"
          w="2rem"
          _hover={{ color: "#37254b" }}
        >
          <BsFacebook />
        </Flex>
        <Flex
          alignItems="center"
          justify="center"
          borderRadius={50}
          h="2rem"
          w="2rem"
          _hover={{ color: "#37254b" }}
        >
          <EmailIcon />
        </Flex>
        <Flex
          alignItems="center"
          justify="center"
          borderRadius={50}
          h="2rem"
          w="2rem"
          _hover={{ color: "#37254b" }}
        >
          <BsTwitter />
        </Flex>
      </Flex>
    </Box>
  );
};

export default MediaIcon;
