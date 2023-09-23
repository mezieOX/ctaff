import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import Link from "next/link";
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";

const FooterContents = () => {
  return (
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)",
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
        xl: "repeat(4, 1fr)",
      }}
      justifyItems={{ base: "center", sm: "start" }}
      alignItems={["start", "start"]}
      textAlign={{ base: "center", sm: "left" }}
      marginBottom={["2rem", "0"]}
      color="white"
      w="full"
      gap={20}
      marginY={8}
    >
      <Box>
        <Text fontWeight={600} fontSize={18}>
          Tutor Twist
        </Text>
        <Text marginTop={4}>
          Opportunities of jobs for teachers in the arts,music, visual arts,
          performing arts, and creative writing and all others is our vision. We
          believe in empowering people and the nation at large
        </Text>
      </Box>
      <Box>
        <Text fontWeight={600} fontSize={{ base: 16, sm: 18 }}>
          Permalinks
        </Text>

        <Box marginTop={4} display="flex" flexDirection="column" gap={3}>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/services">Services</Link>
          <Link href="/contact">Contact</Link>
        </Box>
      </Box>
      <Box>
        <Text fontWeight={600} fontSize={18}>
          Privacy
        </Text>

        <Box marginTop={4} display="flex" flexDirection="column" gap={3}>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/term-condition">Terms and Conditions</Link>
          <Link href="/refund">Refund Policy</Link>
        </Box>
      </Box>
      <Box>
        <Text fontWeight={600} fontSize={{ base: 16, sm: 18 }}>
          Contact Us
        </Text>
        <Box
          marginTop={4}
          display="flex"
          flexDirection="column"
          justifyItems="center"
          gap={3}
        >
          <Box>+234 707 838 372</Box>
          <Box>info@gmail.com</Box>
          <Flex
            gap={{ base: 6, md: 4 }}
            mt={4}
            marginLeft={{ base: ".3rem", sm: 0 }}
          >
            <BsFacebook cursor="pointer" />
            <BsInstagram cursor="pointer" />
            <BsTwitter cursor="pointer" />
            <BsLinkedin cursor="pointer" />
          </Flex>
        </Box>
      </Box>
    </Grid>
  );
};

export default FooterContents;
