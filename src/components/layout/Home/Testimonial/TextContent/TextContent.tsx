import { Box, Flex, Grid, Text } from "@chakra-ui/react";

interface TextContentProps {
  name: string;
  title: string;
  description: string;
}

const TextContent = ({ name, title, description }: TextContentProps) => {
  return (
    <Box w="100%">
      <Flex
        marginBottom={["2rem", "0"]}
        color="white"
        flexDirection="column"
        justifyItems="center"
        alignItems="center"
      >
        <Text
          display="flex"
          color="white"
          marginTop=".7rem"
          fontSize={{ sm: "1.2rem", md: "" }}
        >
          {" "}
          {name}
        </Text>
        <Text
          display="flex"
          color="white"
          height="3rem"
          marginTop=".3rem"
          fontSize={{ sm: "1.2rem", md: "" }}
        >
          {title}
        </Text>
      </Flex>

      <Grid
        bg="#584FF2"
        templateColumns="repeat(1, 1fr)"
        gap={4}
        padding={3.5}
        alignItems="center"
        justifyItems="space-between"
        marginBottom={["2rem", "0"]}
        color="white"
        textAlign="center"
        w="100%"
        minH={{ base: "12rem", sm: "8rem", lg: "7rem", xl: "7rem" }}
      >
        {" "}
        <Text mx="auto" fontSize={{ sm: "1.2rem", md: "" }}>
          {description}
        </Text>
      </Grid>
    </Box>
  );
};

export default TextContent;
