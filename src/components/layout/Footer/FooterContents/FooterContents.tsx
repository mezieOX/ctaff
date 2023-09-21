import { Box, Grid, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import Link from "next/link";
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";

const FooterContents = () => {
  return (
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)",
        md: "repeat(2, 1fr)",
        xl: "repeat(4, 1fr)",
      }}
      gap={{ base: "5rem", xl: 20 }}
      justifyItems="space-between"
      alignItems={["center", "start"]}
      textAlign={{ base: "center", md: "left" }}
      marginBottom={["2rem", "0"]}
      color="white"
      w="full"
      marginY={8}
    >
      <Box>
        <Text fontWeight={600} fontSize={18}>
          IYKELNHUB
        </Text>
        <Text marginTop={4}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
          fugit nobis{" "}
        </Text>
      </Box>
      <Box>
        <Text fontWeight={600} fontSize={18} mx={4}>
          Permalinks
        </Text>

        <UnorderedList
          listStyleType="none"
          marginTop={4}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <ListItem>
            <Link href="/">Home</Link>
          </ListItem>
          <ListItem>
            <Link href="/">About</Link>
          </ListItem>
          <ListItem>
            <Link href="/">Goal</Link>
          </ListItem>
          <ListItem>
            <Link href="/">Contact</Link>
          </ListItem>
        </UnorderedList>
      </Box>
      <Box>
        <Text fontWeight={600} fontSize={18} mx={4}>
          Primacy
        </Text>

        <UnorderedList
          listStyleType="none"
          marginTop={4}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <ListItem>
            <Link href="/">Privacy Policy</Link>
          </ListItem>
          <ListItem>
            <Link href="/">Terms and Conditions</Link>
          </ListItem>
          <ListItem>
            <Link href="/">Refund Policy</Link>
          </ListItem>
        </UnorderedList>
      </Box>
      <Box>
        <Text fontWeight={600} fontSize={18} mx={4}>
          Contact Us
        </Text>
        <UnorderedList
          listStyleType="none"
          marginTop={4}
          display="flex"
          flexDirection="column"
          justifyItems="center"
          alignItems={{base: "center", md: "start"}}
          gap={2}
        >
          <ListItem>+234 703 0822 450</ListItem>
          <ListItem>
            <Link href="/">someone@gmail.com</Link>
          </ListItem>
          <ListItem
            marginTop={{ base: 8, md: 6 }}
            display="flex"
            gap={{ base: 8, md: 6 }}
          >
            <Link href="/">
              <BsFacebook />
            </Link>
            <Link href="/">
              <BsInstagram />
            </Link>
            <Link href="/">
              <BsTwitter />
            </Link>
            <Link href="/">
              <BsLinkedin />
            </Link>
          </ListItem>
        </UnorderedList>

      </Box>
    </Grid>
  );
};

export default FooterContents;
