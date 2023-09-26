import { Box, Flex } from "@chakra-ui/react";
import Copyright from "./Copyright/Copyright";
import FooterContents from "./FooterContents/FooterContents";

const Footer = () => {
  return (
    <Box height={["auto", "auto", "auto"]} bg="#303338">
      <Box height={["auto", "auto", "auto"]} maxWidth="1200px" mx="auto">
        <Box>
          <Box padding={6} mx="auto">
            <Flex width={["100%", "100%"]} justifyItems="space-between">
              <FooterContents />
            </Flex>
          </Box>
          <Copyright />
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
