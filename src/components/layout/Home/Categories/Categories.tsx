import { Box, Flex } from "@chakra-ui/react";
import Aside from "./Aside/Aside";
import Cards from "./Cards/Cards";

export default function Categories() {
  return (
    <Box
      height={["auto", "auto", "auto"]}
      paddingTop="4rem"
      position="relative"
      py={{ base: "3rem" }}
      bg="gray.lighter"
    >
      <Box>
        <Flex
          flexDirection={["column", "column", "column", "row"]}
          justifyContent={["center", "space-between"]}
          alignItems={["center", "start"]}
          gap="3rem"
          maxWidth="1200px"
          padding={6}
          marginTop={{ base: -20, lg: -10 }}
          mx="auto"
        >
          <Aside />
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
      </Box>
    </Box>
  );
}
