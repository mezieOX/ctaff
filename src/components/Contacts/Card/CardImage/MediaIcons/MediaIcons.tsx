import { EmailIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/react";
import { BsFacebook, BsLinkedin, BsTwitter } from "react-icons/bs";

const MediaIcons = () => {
  return (
    <Flex
      color="white"
      gap={5}
      marginTop={{ base: 10, md: 14 }}
      marginBottom={{ base: 6, md: 0 }}
    >
      <Flex
        gap={4}
        alignItems="center"
        backgroundColor="#37254b"
        justify="center"
        borderRadius={50}
        cursor="pointer"
        h="2rem"
        w="2rem"
        _hover={{
          transition: "transform .5s",
          transform: "scale(120%)",
        }}
      >
        <BsFacebook />
      </Flex>
      <Flex
        gap={4}
        alignItems="center"
        backgroundColor="#37254b"
        justify="center"
        borderRadius={50}
        h="2rem"
        w="2rem"
        cursor="pointer"
        _hover={{
          transition: "transform .5s",
          transform: "scale(120%)",
        }}
      >
        <EmailIcon />
      </Flex>
      <Flex
        gap={4}
        alignItems="center"
        backgroundColor="#37254b"
        justify="center"
        borderRadius={50}
        h="2rem"
        cursor="pointer"
        w="2rem"
        _hover={{
          transition: "transform .5s",
          transform: "scale(120%)",
        }}
      >
        <BsTwitter />
      </Flex>
      <Flex
        gap={4}
        alignItems="center"
        backgroundColor="#37254b"
        justify="center"
        borderRadius={50}
        h="2rem"
        cursor="pointer"
        w="2rem"
        _hover={{
          transition: "transform .5s",
          transform: "scale(120%)",
        }}
      >
        <BsLinkedin />
      </Flex>
    </Flex>
  );
};

export default MediaIcons;
