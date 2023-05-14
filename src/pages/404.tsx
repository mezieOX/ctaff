import { Flex, Text, Heading } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
          <motion.div
        key="404"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >

    <Flex minH="100vh" bg="#fff" width="100%">
      <Flex
        flexDirection={["column", "column", "column", "row"]}
        justifyContent={["center", "center", "center", "space-between"]}
        alignItems={["center", "center"]}
        padding="1rem"
        gap="3rem"
      >
        <Box
          width={["100%", "50%"]}
          maxWidth={["100%", "90%"]}
          display="flex"
          justifyContent="center"
          marginLeft="auto"
        >
          <Image src="/images/404.jpg" alt="homeimg" width="700" height="700" />
        </Box>
        <Flex flexDir="column" justifyContent="center">
          <Text
            color="white"
            fontSize={["2rem", "3rem", "7rem"]}
            opacity="0.5"
            textShadow="-4px -10px black"
          >
            OOPS!
          </Text>
          <Text
            color="white"
            fontSize={["2rem", "3rem", "4rem"]}
            opacity="0.5"
            textShadow="-4px -10px black"
          >
            &lt;404/&gt;- Page cannot be found
          </Text>
          <Link href="/" shallow>
            <Button
              bg="black"
              color="#fff"
              fontWeight="bold"
              transition="0.3s"
              _hover={{
                bg: "rgba(0, 0, 0, .6)",
                border: "2px solid #fff",
                boxShadow: "7px 8px 9px black",
              }}
              w={{ base: "100%", md: "auto" }}
            >
              Go to homepage
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Flex>
    </motion.div>
  );
};

export default NotFound;
