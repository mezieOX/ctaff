import Navbar from "@/components/layout/navbar/Navbar";
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
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";
import TextInput from "../../../src/components/form/textField";
import Link from "next/link";
import { animateUnderline } from "@/components/layout/navbar/navbarlink";
import { useState, useEffect } from "react";
import { ColorRing } from "react-loader-spinner";
import { motion } from "framer-motion";
import axios from "axios";
import {
  getTokenCookie,
  setTokenCookie,
} from "@/utils/cookieHandler/token-cookie-handler";

const AdminLogin = () => {
  const [loginInputs, setLoginInputs] = useState({
    username: "",
    password: "",
  });

  const toast = useToast();
  const router = useRouter();
  const { isOpen: showLoginErr, onClose, onOpen } = useDisclosure();
  const [showloadingring, setshowloadingring] = useState(false);
  const [errmessage, seterrmessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const messages = ["Invalid Username or password"];

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
      let { data } = await axios.post("/api/auth/signInAdmin", {
        ...loginInputs,
      });
      console.log("dattt", data);
      const { accessToken, refreshToken, role } = data;
      await setTokenCookie(accessToken, refreshToken, role);
      const tokens = await getTokenCookie();
      setshowloadingring(false);
      onClose();
      if (role == "admin") {
        router.push("/admin");
        window.history.replaceState(null, "", "/admin");
      } else {
        seterrmessage(messages[0]);
        setMessageType("error");
        onOpen();
      }
    } catch (err: any) {
      setshowloadingring(false);
      if (
        err.response?.status == 400 ||
        err.response?.status == 401 ||
        err.response?.status == 403
      ) {
        seterrmessage(messages[0]);
        setMessageType("error");
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

  // console.log(onOpen)

  return (
    <motion.div
      key="login"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box bg="#37254b" minH="100vh">
        <Navbar />
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
                setInputState={setLoginInputs}
                inputsState={loginInputs}
              />

              <Link
                href="/verifyemail/password-reset/teach_finder/inputemail"
                style={{ marginLeft: "auto" }}
                shallow
              >
                <Text
                  color="#fff"
                  marginTop="-2rem"
                  textDecoration="none"
                  variant="none"
                  position="relative"
                  _hover={{
                    color: "white",
                    _before: {
                      content: "''",
                      position: "absolute",
                      bottom: "-5px",
                      width: "100%",
                      height: "2px",
                      backgroundColor: "white",
                      animation: `${animateUnderline} 0.3s forwards`,
                      transition:
                        "opacity 0.3s ease-out, transform 0.3s ease-out, visibility 0s 0.3s",
                    },
                  }}
                >
                  Forgot Password?
                </Text>
              </Link>
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

export default AdminLogin;

export async function getServerSideProps(context: any) {
  const { req, res } = context;
  // import jwt-=
  const { cookies } = req;
  const { refreshToken, accessToken } = cookies;

  const url = process.env.API_URL;

  if (refreshToken && accessToken) {
    let rtPload: any = jwt_decode(refreshToken);
    let atPload: any = jwt_decode(accessToken);

    const cTime = Math.floor(Date.now() / 1000);
    if (atPload.exp > cTime) {
      return {
        redirect: {
          destination: "/admin",
          permanent: false,
        },
      };
    } else if (rtPload.exp > cTime) {
      return {
        redirect: {
          destination: "/admin",
          permanent: false,
        },
      };
    }
    // console.log("rtp", rtPload);
    // console.log("rtp", atPload)
    // try{
    //   const {data} = await axios.post(`${url}/auth/isValidTokens`, {
    //     rt: refreshToken,
    //     at: accessToken
    //   });
    //   console.log(data)
    //   return {
    //     redirect: {
    //       destination: `/dashboard/${data.role}`,
    //       permanent: false,
    //     },
    //   };
    // }catch(err){
    //   return {
    //     props: {},
    //   };
    // }
  }

  return {
    props: {},
  };
}
