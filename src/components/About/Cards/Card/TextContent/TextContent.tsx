import { Text } from "@chakra-ui/react";
import React from "react";

const TextContent = ({ name, title }: { name: string; title: string }) => {
  return (
    <>
      <Text
        as="div"
        color="white"
        fontSize={{ base: "1.2rem", md: "1.2rem" }}
        fontWeight={900}
        textAlign="center"
        padding={6}
      >
        {name}
      </Text>
      <Text
        as="div"
        marginTop={{ base: -7, md: -8 }}
        marginBottom=".4rem"
        color="white"
        fontSize={{ base: "1rem", md: "1rem" }}
        textAlign="center"
        paddingY={6}
        maxWidth={{ base: "80%", md: "88%" }}
        mx="auto"
        flex={1}
      >
        {title}
      </Text>
    </>
  );
};

export default TextContent;
