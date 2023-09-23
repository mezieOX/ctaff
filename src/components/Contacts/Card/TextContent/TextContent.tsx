import { Box, Text } from "@chakra-ui/react";

const TextContent = () => {
  return (
    <Box marginY={6}>
      <Text
        as="div"
        color="white"
        fontSize="1.5rem"
        fontWeight={900}
        lineHeight="1.3"
      >
        Contact Us
      </Text>
      <Text as="div" marginTop="1rem" color="white" fontSize=".9rem">
        Explore teaching careers and connect with educators in diverse
        categories. Teachers, find job opportunities in your field.
      </Text>
    </Box>
  );
};

export default TextContent;
