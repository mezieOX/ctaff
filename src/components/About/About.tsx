import { Box, Flex, Text } from "@chakra-ui/react";
import { Cards } from "./Cards";

const About = () => {
  return (
    <Box
      height={["auto", "auto", "auto"]}
      marginBottom={{ base: "15rem", xl: "10rem" }}
      maxWidth="1200px"
      mx="auto"
    >
      <Box height={["auto", "auto", "auto"]}>
        <Box>
          <Box
            padding={6}
            marginTop={{ base: "10rem", lg: "20rem", xl: "12rem" }}
            mx="auto"
          >
            <Text
              as="div"
              color="white"
              fontSize={{ base: "2rem", md: "2.1rem", lg: "2.1rem" }}
              height={["300px", "270px", "250px"]}
              fontWeight={900}
              lineHeight="1.3"
              marginTop={{ base: "4rem", md: ".5rem", lg: "20rem" }}
              textAlign="center"
            >
              Meet Our Team
            </Text>
            <Flex
              justifyItems="space-between"
              marginTop={{ base: "-12rem", sm: "-8rem", md: "-8.5rem" }}
            >
              <Cards />
            </Flex>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default About;
