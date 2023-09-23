import {
  InputRightElement,
  FormLabel,
  Input,
  InputGroup,
  FormControl,
  Flex,
  Heading,
  Button,
  useToast,
  Text,
} from "@chakra-ui/react";
import { ArrowRightIcon } from '@chakra-ui/icons';
import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import { useRouter } from "next/router";
import Navbar from "@/components/layout/navbar/Navbar";

const InputYourEmail = ({
  verifType,
  user,
}: {
  verifType: string;
  user: string;
}) => {
  const router = useRouter();
  let url = process.env.NEXT_PUBLIC_API_URL;

  const [value, setValue] = useState("");
  const [showloadingring, setShowloadingring] = useState(false);
  const toast = useToast();

  const registerUser = async () => {
    try {
      // const res = await axios.post(`${url}/users/sendVerificationSignupOtp`, {
      //   email: value.trim(),
      //   role: user,
      // });
      const res = await axios.post("/api/users/sendVerificationSignupOtp", {
        email: value.trim(),
        role: user,
      });
      console.log("theres", res)
      const { token, registrationStep } = res.data;
      setShowloadingring(false);
      if (registrationStep) {
        router.push(`/register/${registrationStep}/${token}`);
      } else {
        router.push(`/verifyemail/otp/register/${token}`);
      }
    } catch (err: any) {
      setShowloadingring(false);
      console.log(err);
      toast({
        title:
          "An error occured. Please check internet connection and ensure your email is correct",
        position: "top",
        variant: "left-accent",
        status: "error",
        duration: 10000,
        isClosable: true,
      });
    }
  };

  const forgotPassword = async () => {
    try {
      const res = await axios.post(
        "/api/users/sendVerificationForgotPasswordOtp",
        {
          email: value.trim(),
        }
      );
      const { token } = res.data;
      setShowloadingring(false);
        router.push(`/verifyemail/otp/password-reset/${token}`);
    } catch (err: any) {
      if (err.response?.status == 400) {
        setShowloadingring(false);
        toast({
          title: "Email does not exist!",
          position: "top",
          variant: "left-accent",
          status: "error",
          duration: 10000,
          isClosable: true,
        });
      } else {
        setShowloadingring(false);
        console.log(err);
        toast({
          title:
            "An error occured. Please check internet connection and ensure your email is correct",
          position: "top",
          variant: "left-accent",
          status: "error",
          duration: 10000,
          isClosable: true,
        });
      }
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setShowloadingring(true);

    if (verifType == "register") {
      registerUser();
    } else if (verifType == "password-reset") {
      forgotPassword();
    }
  };

  return (
    <motion.div
      key="inputemail"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1 }}
      >
      <Flex
        bg="#37254b"
        height="100vh"
        width="100%"
        flexDir="column"
        // alignItems="center"
        // justifyContent="center"
        // m="auto"
        gap="2rem"
        >
        <Navbar/>
        <Flex
          placeItems="center"
          flexDir="column"
          height="100%"
          justifyContent= "center"
        >
        <Heading
          as="h1"
          fontSize="xl"
          width={["80%", "60%", "40%"]}
          fontWeight="bold"
          color="#fff"
          display="flex"
          gap="1rem"
        >
          {verifType == "password-reset" && <Text> Forgot Password? </Text>}
          <Text> Input Your email. </Text>
        </Heading>
        <Flex
          width={["80%", "60%", "40%"]}
          height="30%"
          // placeItems="center"
          // flexDir="row"
          justifyContent="center"
          // bg="#37254b"
          // boxShadow="7px 8px 9px black"
          // rounded="lg"
        >
          <form style={{ width: "100%" }} onSubmit={handleSubmit}>
            <FormControl isRequired width="100%">
              <InputGroup size="lg">
                <Input
                  errorBorderColor="crimson"
                  focusBorderColor="#37254b"
                  pr="4.5rem"
                  type="email"
                  placeholder="e.g applead@gmail.com"
                  bg="#fff"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
                <InputRightElement
                  bg="#000"
                  // width="20%"
                  color="#fff"
                  rounded="inherit"
                >
                  <Button
                    rounded="inherit"
                    type="submit"
                    width="100%"
                    isDisabled={showloadingring}
                    height="100%"
                    bg="#000"
                    variant="none"
                    transition=".3s"
                    _hover={{ fontSize: { base: "1rem", md: "1.5rem" } }}
                  >
                    {!showloadingring && <ArrowRightIcon />}
                    {showloadingring && <ColorRing width={30} height={30} />}
                    
                  </Button>
                </InputRightElement>
              </InputGroup>

              <FormLabel color="#fff">Email</FormLabel>
            </FormControl>
          </form>
        </Flex>
        </Flex>
      </Flex>
    </motion.div>
  );
};

export default InputYourEmail;

export async function getServerSideProps(context: any) {
  const {
    params: { verifType, user },
  } = context;

  if (verifType != "register" && verifType != "password-reset") {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  if (user != "teacher" && user != "teach_finder" && user != "school") {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  return {
    props: {
      verifType,
      user,
    },
  };
}
