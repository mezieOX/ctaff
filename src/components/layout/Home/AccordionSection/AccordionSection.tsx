import { Box, Flex, Text } from "@chakra-ui/react";
import { Accordions } from "./Accordions";

const AccordionSection = () => {
  return (
    <Box
      bg={{ base: "#37254b", md: "transparent" }}
      marginTop={{ base: "18rem", md: 0 }}
    >
      <Box height={["auto", "auto", "auto"]} maxWidth="1200px" mx="auto">
        <Box height={["auto", "auto", "auto"]}>
          <Box>
            <Box padding={6} marginTop={-56} mx="auto">
              <Text
                as="div"
                color="white"
                fontSize={{ base: "2rem", sm: "3rem", md: "2.1rem" }}
                height={["300px", "270px", "250px"]}
                fontWeight={900}
                lineHeight="1.3"
                marginTop={{ base: "6rem", sm: "8rem", md: "11rem", lg: "56" }}
                textAlign="center"
              >
                Frequently Asked Questions
              </Text>
              <Flex
                width={["100%", "100%"]}
                justifyItems="space-between"
                marginTop={{base: "-12rem", sm:"-8.5rem"}}
              >
                <Accordions />
              </Flex>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AccordionSection;
