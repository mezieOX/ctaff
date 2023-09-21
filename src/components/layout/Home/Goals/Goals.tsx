import { Box, Flex, Text } from "@chakra-ui/react";
import { Cards } from "./Cards";

const Goals = () => {
  return (
    <Box
      height={["auto", "auto", "auto"]}
      py={{ base: "3rem" }}
      maxWidth="1200px"
      mx="auto"
    >
      <Box
        height={["auto", "auto", "auto"]}
        paddingTop="4rem"
        py={{ base: "3rem" }}
      >
        <Box>
          <Box padding={6} marginTop={{ base: -10, lg: 24, xl: -10 }} mx="auto">
            <Text
              as="div"
              color="white"
              fontSize={{ base: "2rem", md: "3rem", lg: "2.1rem" }}
              height={["300px", "270px", "250px"]}
              fontWeight={900}
              lineHeight="1.3"
              marginTop={{ base: "4rem", md: ".5rem", lg: "20rem" }}
              textAlign="center"
            >
              Our Goals
            </Text>
            <Flex
              width={["100%", "100%"]}
              justifyItems="space-between"
              marginTop={{ base: "-10rem", sm: "-8rem", md: "-8.5rem" }}
            >
              <Cards />
            </Flex>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Goals;
