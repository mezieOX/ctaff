import { Box, Flex } from "@chakra-ui/react";
import CardImage from "./CardImage/CardImage";
import MediaIcons from "./CardImage/MediaIcons/MediaIcons";
import MediaAndText from "./MediaAndText/MediaAndText";
import TextContent from "./TextContent/TextContent";

const Card = () => {
  return (
    <Box
      bg="#5A449F"
      gridColumnStart={{ base: "1", md: 1, xl: "1" }}
      gridColumnEnd={{ base: "4", md: 2 }}
      position={{ base: "relative", xl: "absolute" }}
      overflow="hidden"
      borderRadius={15}
      padding={{ base: 0, sm: 6 }}
      maxHeight={{ base: "full", xl: "40rem" }}
      minHeight={{ base: "full", xl: "40rem" }}
      maxWidth={{ base: "100%", xl: "35%" }}
      _hover={{
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 80px 0 rgba(0, 0, 0, 0.19)",
      }}
      top={{ base: 0, xl: "-5rem" }}
      left={{ base: "0", xl: "4.5rem" }}
    >
      <Flex
        rounded={10}
        padding={{ base: 2, md: 2 }}
        alignItems={{ base: "start" }}
        h="full"
        position="relative"
        justify="start"
        flexDir="column"
        mx=".5rem"
      >
        <CardImage />
        <Flex flexDir="column">
          <TextContent />
        </Flex>
        <MediaAndText />
        <MediaIcons />
      </Flex>
    </Box>
  );
};

export default Card;
