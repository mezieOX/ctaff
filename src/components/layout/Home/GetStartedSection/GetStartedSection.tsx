import { Flex } from "@chakra-ui/react";
import GetStartedImage from "./GetStartedImage/GetStartedImage";
import TextContent from "./TextContent/TextContent";

const GetStartedSection = () => {
  return (
    <Flex
      flexDirection={{ base: "column", md: "row" }}
      justifyContent={{ base: "center", lg: "space-between" }}
      alignItems={{ base: "center", lg: "start" }}
      marginTop={["1rem", "2rem", "3rem"]}
      gap="3rem"
      maxWidth="1200px"
      padding={6}
      mx="auto"
    >
      <TextContent />
      <GetStartedImage />
    </Flex>
  );
};

export default GetStartedSection;
