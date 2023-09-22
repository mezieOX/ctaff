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

const Navbar = ({ show }: { show?: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scroll, setScroll] = useState(false);

  const container: CSSProperties = {
    backgroundColor: "#584FF2",
    position: "sticky",
    top: 0,
    zIndex: 1,
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
          <Link href="/">
            <Image
              src="/images/iykelnHub.png"
              width={60}
              height={60}
              alt="logo"
            ></Image>
          </Link>

          {!show && (
            <>
              <IconButton
                aria-label="Toggle navigation"
                size="lg"
                color="white"
                variant="none"
                icon={<HamburgerIcon />}
                onClick={isOpen ? onClose : onOpen}
                display={isOpen ? "none" : { base: "flex", lg: "none" }}
              />

              <Box
                display={{ base: "none", md: "none", lg: "flex" }}
                width={{ base: "full", md: "auto" }}
                alignItems="center"
              >
                <NavBarLink to="/" linkName="Home" />
                <NavBarLink to="/about" linkName="About" />
                <NavBarLink to="/our-goals" linkName="Our Goals" />
                <NavBarLink to="/contact" linkName="Contact" />
                <NavBarLink to="/login" linkName="Login" />
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
                gap={{ base: 16, md: 20 }}
                position="absolute"
                right={10}
                textAlign="center"
                top={20}
                padding={{ base: "12", sm: "16" }}
                paddingRight={{ base: "6rem", sm: "6.5rem", md: 24 }}
                bg="#584FF2"
                width={{ base: "70%", sm: "60%", md: "50%" }}
              >
                <NavBarLink to="/" linkName="Home" />
                <NavBarLink to="/about" linkName="About" />
                <NavBarLink to="/our-goals" linkName="Our Goals" />
                <NavBarLink to="/contact" linkName="Contact" />
                <NavBarLink to="/login" linkName="Login" />
              </Flex>

              <IconButton
                marginLeft="auto"
                marginBottom="auto"
                padding={10}
                aria-label="Toggle navigation"
                size="lg"
                color="white"
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
