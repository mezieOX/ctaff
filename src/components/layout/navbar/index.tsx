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

const Navbar = ({show}: {show?: string}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
    <Box bg="inherit" boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)">
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding={6}
      >
        <Link href="/">
          <Image
            src="/images/iykelnHub.png"
            width={40}
            height={45}
            alt="homeimg"
          ></Image>
        </Link>


        {!show && 
        <>
          <IconButton
            aria-label="Toggle navigation"
            size="lg"
            color="white"
            variant="none"
            icon={<HamburgerIcon />}
            onClick={isOpen ? onClose : onOpen}
            display={{ md: "none" }}
          />

          <Box
            display={{ base: "none", md: "flex" }}
            width={{ base: "full", md: "auto" }}
            alignItems="center"
          >
            <NavBarLink to='/' linkName="Home"/>
            <NavBarLink to='/login' linkName="Log in"/>
          </Box>
        </>
        }
      </Flex>

        
      {!show && <Slide
        direction="top"
        in={isOpen}
        style={{ zIndex: 10 }}
        unmountOnExit={true}
      >
        <Box
          bg="black"
          height="150px"
          display={{ base: isOpen ? "flex" : "none", md: "none" }}
          flexDir="row"
          alignItems="center"
          justifyContent="start"
        >
          <NavBarLink to='/' linkName="Home"/>
          <NavBarLink to='/login' linkName="Log in"/>


          <IconButton
            marginLeft="auto"
            marginBottom="auto"
            aria-label="Toggle navigation"
            size="lg"
            color="white"
            variant="none"
            icon={<CloseIcon />}
            onClick={isOpen ? onClose : onOpen}
            display={{ md: "none" }}
          />
        </Box>
      </Slide>}
    </Box>
  );
};

export default Navbar;
