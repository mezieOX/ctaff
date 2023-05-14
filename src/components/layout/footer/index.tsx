import {
  Avatar,
  Box,
  Divider,
  Flex,
  Grid,
  Heading,
  Button,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { EmailIcon } from "@chakra-ui/icons";
import NavBarLink from "@/components/layout/navbar/navbarlink";

const Footer = () => {
  return (
              <Box
            bg="black"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            flexDir="column"
            height={["auto", "auto"]}
            gap="3rem"
            px="2rem"
            py="1rem"
          >
            <Box
              display="flex"
              flexDir={["column", "row"]}
              alignItems={["center", "flex-start"]}
              width="100%"
              justifyContent="space-between"
              gap="3rem"
            >
              <Flex dir="column">
                {/* <Navbar /> */}
                <NavBarLink to="/" linkName="Home" />
                <NavBarLink to="/login" linkName="Log in" />
              </Flex>
              <Flex flexDir="column" alignItems="center" color="#fff">
                <Text textDecor="underline" fontWeight="extrabold">
                  Contact
                </Text>
                <Flex dir="row" gap="4px" alignItems="center">
                  <EmailIcon />
                  <Text>iykelnhub@gmail.com</Text>
                </Flex>
              </Flex>
            </Box>
            <Box
              color="#fff"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              flexDir="column"
            >
              <Text>Powered by iykelnhub</Text>
              <Text>@copyright 2023</Text>
            </Box>
          </Box>
)
};

export default Footer;
