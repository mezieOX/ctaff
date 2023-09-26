import Image from "next/image";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Slide,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { keyframes } from "@emotion/react";
import NavBarLink from "@/components/layout/navbar/navbarlink";
import { CSSProperties, useEffect, useState } from "react";
import { Logo } from "@/components/Global";
import { theme } from "@/utils/chakratheme";

const Navbar = ({ show }: { show?: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scroll, setScroll] = useState(false);

  const container: CSSProperties = {
    backgroundColor: "#0866FF",
    position: "sticky",
    top: 0,
    zIndex: 100,
    transition: "all linear .1s",
    boxShadow: "2px 2px 10px #000",
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 1) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const animateUnderline = keyframes`
  0% {
    transform: scaleX(0);
    transform-origin: center;
  }
  100% {
    transform: scaleX(1);
    transform-origin: center;
  }
`;

  return (
    <Box as="div" style={scroll ? container : {}}>
      <Box maxWidth="1200px" padding={6} mx={["auto", "auto", "auto", "auto"]}>
        <Flex
          as="nav"
          align={{ base: "start", lg: "center" }}
          justify="space-between"
          wrap="wrap"
        >
          <Box visibility={isOpen ? "hidden" : "visible"}>
            <Link href="/">
              <Logo />
            </Link>
          </Box>

          {!show && (
            <>
              <IconButton
                aria-label="Toggle navigation"
                size="lg"
                variant="none"
                icon={<HamburgerIcon />}
                color={
                  scroll ? theme.colors.white : theme.colors.primary.default
                }
                onClick={isOpen ? onClose : onOpen}
                display={isOpen ? "none" : { base: "flex", lg: "none" }}
              />

              <Box
                display={{ base: "none", md: "none", lg: "flex" }}
                width={{ base: "full", md: "auto" }}
                alignItems="center"
                color="#000"
              >
                <NavBarLink to="/" linkName="Home" scroll={scroll} />
                <NavBarLink to="/about" linkName="About" scroll={scroll} />
                <NavBarLink
                  to="/services"
                  linkName="Services"
                  scroll={scroll}
                />
                <NavBarLink to="/contact" linkName="Contact" scroll={scroll} />
                <NavBarLink to="/login" linkName="Login" scroll={scroll} />
              </Box>
            </>
          )}
        </Flex>

        {!show && (
          <Slide
            direction="top"
            in={isOpen}
            style={{ zIndex: 10 }}
            unmountOnExit={true}
          >
            <Box
              height="50vh"
              display={{ base: isOpen ? "flex" : "none", lg: "none" }}
              flexDir="row"
              alignItems="center"
              justifyContent="start"
              position="relative"
            >
              <Flex
                flexDir="column"
                alignItems="space-between"
                justify="space-between"
                paddingBottom={10}
                paddingRight={{ base: "8.5%", sm: "5%" }}
                position="absolute"
                right={0}
                left={0}
                textAlign="center"
                top={20}
                bg="primary.default"
                width="100%"
                height={{ base: "60vh", md: "70vh" }}
              >
                <NavBarLink to="/" linkName="Home" scroll={scroll} />
                <NavBarLink to="/about" linkName="About" scroll={scroll} />
                <NavBarLink
                  to="/services"
                  linkName="Services"
                  scroll={scroll}
                />
                <NavBarLink to="/contact" linkName="Contact" scroll={scroll} />
                <NavBarLink to="/login" linkName="Login" scroll={scroll} />
              </Flex>

              <Box position="absolute" top="6" left="6">
                <Link href="/">
                  <Logo />
                </Link>
              </Box>

              <IconButton
                marginLeft="auto"
                marginBottom="auto"
                padding={10}
                aria-label="Toggle navigation"
                size="lg"
                color={scroll ? theme.colors.white : theme.colors.black}
                variant="none"
                icon={<CloseIcon />}
                onClick={isOpen ? onClose : onOpen}
                display={{ lg: "none" }}
              />
            </Box>
          </Slide>
        )}
      </Box>
    </Box>
  );
};

export default Navbar;
