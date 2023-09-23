import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const Aside = () => {
  return (
    <Flex
      flexDirection="column"
      alignItems={["start", "flex-start"]}
      textAlign={["left", "left"]}
      marginTop={["2rem", "5rem"]}
      marginBottom={["2rem", "0"]}
      gap="3rem"
      width={["100%", "80%", "65%"]}
    >
      <Text
        as="div"
        flex={1}
        color="white"
        fontSize={["2rem", "3rem", "2.1rem"]}
        height={["300px", "270px", "250px"]}
        fontWeight={900}
        lineHeight="1.3"
      >
        Categories
      </Text>
      <Text as="div" flex={1} marginTop={-8} color="white">
        Explore teaching careers and connect with educators in diverse
        categories. Teachers, find job opportunities in your field. Learners,
        discover qualified instructors tailored to your specific needs. Your
        educational journey starts now.
      </Text>
      <Stack direction="row" spacing={4} align="center">
        <Link href="/about">
          <Button
            colorScheme="teal"
            variant="outline"
            _hover={{
              border: "1px solid white",
              bg: "transparent",
              color: "white",
              transition: "all .2s ease-in",
            }}
            px={9}
            py={7}
            color="#37254b"
            bg="white"
            border="none"
            borderRadius={0}
            marginTop={-3}
          >
            Learn More
          </Button>
        </Link>
      </Stack>
    </Flex>
  );
};

export default Aside;
