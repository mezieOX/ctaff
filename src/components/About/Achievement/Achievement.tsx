import { Flex } from "@chakra-ui/react";
import AchievementImage from "./AchievementImage/AchievementImage";
import TextContent from "./TextContent/TextContent";

const Achievement = () => {
  return (
    <Flex
      flexDirection={{ base: "column", xl: "row" }}
      justifyContent={{ base: "center", xl: "space-between" }}
      alignItems={{ base: "center", xl: "start" }}
      marginTop={["1rem", "2rem", "3rem"]}
      gap="6rem"
      maxWidth="1200px"
      padding={6}
      mx="auto"
    >
      <AchievementImage />
      <TextContent />
    </Flex>
  );
};

export default Achievement;
