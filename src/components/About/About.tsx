import { Box, Flex, Text } from "@chakra-ui/react";
import { Achievement } from "./Achievement";
import { Cards } from "./Cards";

const About = () => {
  return (
    <Box bg="#1b1222">
      <Achievement />
      <Box
        backgroundColor="#37254b"
        marginBottom={{ base: "15rem", xl: "10rem" }}
        paddingBottom={{ base: "15rem", xl: "10rem" }}
      >
        <Box height="max">
          <Box height={["auto", "auto", "auto"]} maxWidth="1200px" mx="auto">
            <Box>
              <Box
                padding={6}
                marginTop={{ base: "5rem", lg: "8rem", xl: "8rem" }}
                mx="auto"
              >
                <Text
                  as="div"
                  color="white"
                  fontSize={{ base: "2rem", md: "2.1rem", lg: "2.1rem" }}
                  height={["300px", "270px", "250px"]}
                  fontWeight={900}
                  lineHeight="1.3"
                  textAlign="center"
                  marginTop={{ base: "5rem", xl: "6rem" }}
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
      </Box>
    </Box>
  );
};

export default About;
