import { Box, Flex, Text } from "@chakra-ui/react";
import { Cards } from "./Cards";

const TextContent = () => {
  return (
    <Flex
      flexDirection="column"
      alignItems={{ base: "center", md: "flex-start" }}
      textAlign={{ base: "center", md: "left" }}
      marginBottom={["2rem", "0"]}
      gap={["1rem", "3rem"]}
    >
      <Text
        as="div"
        flex={1}
        color="white"
        fontSize={{ base: "2rem", sm: "3rem", md: "2.1rem", xl: "2.1rem" }}
        height={["300px", "270px", "250px"]}
        fontWeight={900}
        lineHeight="1.3"
        mx={{ base: "auto", xl: "0" }}
        marginTop={{ base: "-2rem", sm: 0 }}
      >
        Achievements
      </Text>
      <Text
        as="div"
        flex={1}
        marginTop={{ base: ".2rem", sm: -6 }}
        color="white"
        textAlign={{ base: "center", xl: "left" }}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum odit
        corrupti nesciunt commodi saepe dolore, enim itaque asperiores autem
        quasi qui, laboriosam illo? Natus saepe molestiae nihil quisquam minus
        sunt!
      </Text>
      <Box
        width={["100%", "100%"]}
        maxWidth={["100%", "100%"]}
        display="flex"
        marginLeft="auto"
        position="relative"
      >
        <Cards />
      </Box>
    </Flex>
  );
};

export default TextContent;
