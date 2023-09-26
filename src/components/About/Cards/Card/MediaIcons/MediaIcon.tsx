import { Box, Flex } from "@chakra-ui/react";
import { BsFacebook, BsTwitter } from "react-icons/bs";

import { EmailIcon } from "@chakra-ui/icons";
import { theme } from "@/utils/chakratheme";
const MediaIcon = () => {
  return (
    <Box>
      <Flex
        color="white"
        position="absolute"
        flexDir="column"
        top="20"
        right="0"
        bg="warning.default"
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
          _hover={{ color: theme.colors.primary.default }}
        >
          <BsFacebook />
        </Flex>
        <Flex
          alignItems="center"
          justify="center"
          borderRadius={50}
          h="2rem"
          w="2rem"
          _hover={{ color: theme.colors.primary.default }}
        >
          <EmailIcon />
        </Flex>
        <Flex
          alignItems="center"
          justify="center"
          borderRadius={50}
          h="2rem"
          w="2rem"
          _hover={{ color: theme.colors.primary.default }}
        >
          <BsTwitter />
        </Flex>
      </Flex>
    </Box>
  );
};

export default MediaIcon;
