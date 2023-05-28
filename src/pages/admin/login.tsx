import Navbar from "@/components/layout/navbar";
import {
  Box,
  Flex,
  Heading,
  Button,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import TextInput from "../../../src/components/form/textField";
import Link from "next/link";
import { animateUnderline } from "@/components/layout/navbar/navbarlink";
import { useState, useEffect } from "react";
import { ColorRing } from "react-loader-spinner";
import { motion } from "framer-motion";
import axios from "axios";

const Login = () => {
  const [loginInputs, setLoginInputs] = useState({
    email: "",
    password: "",
  });

  const toast = useToast();
  const router = useRouter();
  const { isOpen: showLoginErr, onClose, onOpen } = useDisclosure();
  const [showloadingring, setshowloadingring] = useState(false);
  const [errmessage, seterrmessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const messages = [
    "A mail has been sent to you. Follow the link to continue to login",
    "Invalid Email or password",
  ];

  let url = process.env.NEXT_PUBLIC_API_URL;

  // useEffect(() => {
  //   onOpen();
  //   const showErrTimer = setTimeout(() => {
  //     onClose();
  //   }, 6000);

  //   return () => {
  //     clearTimeout(showErrTimer);
  //   };
  // }, []);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setshowloadingring(true);
    onClose();
    // console.log(loginInputs);
    try {
      let { data } = await axios.post(`${url}/users/login`, { ...loginInputs });
      setshowloadingring(false);
      onClose();
      if (data.role == "teacher") {
        router.push("/dashboard/teacher");
      }
      console.log(data);
    } catch (err: any) {
      setshowloadingring(false);
      if (err.response?.status == 400) {
        seterrmessage(messages[1]);
        setMessageType("error");
        onOpen();
      } else if (err.response?.status == 401) {
        setMessageType("info");
        seterrmessage(messages[0]);
        onOpen();
      } else {
        onClose();
        toast({
          title: "An error ocurred. Please check your internet connection",
          position: "top",
          variant: "left-accent",
          status: "error",
          duration: 10000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <motion.div
      key="login"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box bg="#37254b" minH="100vh">
        <Navbar show="no"/>
        <Flex
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          mx="auto"
          my="3rem"
          w={["80%", "60%", "40%"]}
        >
          <Heading
            as="h1"
            fontSize="xl"
            fontWeight="bold"
            lineHeight="tight"
            letterSpacing="tight"
            color="#fff"
            mt={0}
            mb={4}
            mr="auto"
          >
            Admin Login
          </Heading>
          <Box
            px={6}
            py={8}
            h="100%"
            w="100%"
            bg="linear-gradient(50deg, rgba(-198, 2, 52, -1.99), gray);"
            rounded="lg"
            shadow="xl"
          >
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "2rem",
              }}
              onSubmit={handleLogin}
            >
              {showLoginErr && (
                <Alert status={messageType == "error" ? "error" : "info"}>
                  <AlertIcon />
                  <AlertTitle>{errmessage}</AlertTitle>
                </Alert>
              )}
              <TextInput
                label="Username"
                type="text"
                name="username"
                setInputState={setLoginInputs}
                inputsState={loginInputs}
              />
              <TextInput
                label="Password"
                type="password"
                name="password"
                // page="login"
                // helper="should be at least 8 characters"
                setInputState={setLoginInputs}
                inputsState={loginInputs}
              />

              <Button
                bg="#37254b"
                type="submit"
                transition=".5s"
                color="#fff"
                isDisabled={showloadingring}
                _hover={{ opacity: ".7" }}
              >
                {!showloadingring && "Log in"}
                {showloadingring && <ColorRing width={30} height={30} />}
              </Button>
            </form>
          </Box>
        </Flex>
      </Box>
    </motion.div>
  );
};

export default Login;
