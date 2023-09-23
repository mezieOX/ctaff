import { Box, Grid, ListItem, Text, UnorderedList } from "@chakra-ui/react";
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
      gap={{ base: "2rem", xl: 20 }}
      justifyItems={{ base: "center", sm: "space-between" }}
      alignItems={["start", "start"]}
      textAlign={{ base: "center", sm: "left" }}
      marginBottom={["2rem", "0"]}
      color="white"
      w="full"
      marginY={8}
    >
      <Box>
        <Text fontWeight={600} fontSize={18}>
          Tutor Twist
        </Text>
        <Text marginTop={4}>
          Opportunities of jobs for teachers in the arts,music, visual arts, performing arts, and creative writing
            and all others is our vision. We believe in empowering people and the nation at large
        </Text>
      </Box>
      <Box>
        <Text fontWeight={600} fontSize={{ base: 16, sm: 18 }}>
          Permalinks
        </Text>

        <UnorderedList
          listStyleType="none"
          marginTop={4}
          display="flex"
          flexDirection="column"
          gap={2}
          marginLeft={{ base: -0.5, sm: 0 }}
        >
          <ListItem>
            <Link href="/">Home</Link>
          </ListItem>
          <ListItem>
            <Link href="/">About</Link>
          </ListItem>
          <ListItem>
            <Link href="/services">Services</Link>
          </ListItem>
          <ListItem>
            <Link href="/contact">Contact</Link>
          </ListItem>
        </UnorderedList>
      </Box>
      <Box>
        <Text fontWeight={600} fontSize={18} mx={4}>
          Privacy
        </Text>

        <UnorderedList
          listStyleType="none"
          marginTop={4}
          display="flex"
          flexDirection="column"
          gap={2}
          marginLeft={{ base: -0.5, sm: 0 }}
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
        <Text fontWeight={600} fontSize={{ base: 16, sm: 18 }} mx={4}>
          Contact Us
        </Text>
        <UnorderedList
          listStyleType="none"
          marginTop={4}
          display="flex"
          flexDirection="column"
          justifyItems="center"
          alignItems={{ base: "center", sm: "start", md: "start" }}
          gap={2}
        >
          <ListItem marginLeft={{ base: -6, sm: 0 }}>
            +234 707 838 372 
          </ListItem>
          <ListItem>
            <Link href="/">info@gmail.com</Link>
          </ListItem>
          <ListItem
            marginTop={{ base: 6, md: 6 }}
            display="flex"
            gap={{ base: 5, md: 6 }}
            marginLeft={{ base: -6, sm: 0 }}
          >
            <Link href="#">
              <BsFacebook />
            </Link>
            <Link href="#">
              <BsInstagram />
            </Link>
            <Link href="#">
              <BsTwitter />
            </Link>
            <Link href="#">
              <BsLinkedin />
            </Link>
          </ListItem>
        </UnorderedList>
      </Box>
    </Grid>
  );
};

export default FooterContents;
