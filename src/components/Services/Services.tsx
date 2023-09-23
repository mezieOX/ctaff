import { Box, Flex } from "@chakra-ui/react";
import { Cards } from "./Cards";

const Services = () => {
  return (
    <Box height={["auto", "auto", "auto"]} maxWidth="1200px" mx="auto">
      <Box height={["auto", "auto", "auto"]}>
        <Box
          marginBottom={{ base: "15rem", xl: "10rem" }}
          marginTop={{ base: "15rem", md: "10rem", lg: "38rem", xl: "30rem" }}
        >
          <Box padding={6} mx="auto">
            <Flex width={["100%", "100%"]} justifyItems="space-between">
              <Cards />
            </Flex>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Services;
