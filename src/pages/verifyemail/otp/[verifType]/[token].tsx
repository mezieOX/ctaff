import { useRouter } from "next/router";
import {
  Box,
  PinInput,
  PinInputField,
  Flex,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Loader from "@/components/layout/loader";
import { NextRequest, NextResponse } from "next/server";

const VerifyEmail = ({ verifType }: { verifType: string}) => {
  const router = useRouter();
  const toast = useToast();
  const { token: tok } = router.query;

  const [pin, setPin] = useState("");
  const [loading, setloading] = useState(false);
  let url = process.env.NEXT_PUBLIC_API_URL;

  function handlePinChange(value: string) {
    setPin(value);
  }

  useEffect(() => {
    toast({
      title:
        "A six digit Otp has been sent to your email. Please input otp to continue.",
      position: "top",
      variant: "left-accent",
      isClosable: true,
      duration: 10000,
    });
  }, [toast]);

  useEffect(() => {

    console.log(url);

    if (pin.length === 6) {
      setloading(true);
        (async function () {
          try {
            if (verifType == "register"){
              const res: any = await axios.post("/api/users/verifyOtp", {
                token: tok,
                otp: +pin,
                otpType: 'signup',
              });
              const { token, registrationStep } = res.data;
              setloading(false);
              router.push(`/register/${registrationStep}/${token}`);
            }else if(verifType == "password-reset"){
              const res: any = await axios.post("/api/users/verifyOtp", {
                token: tok,
                otp: +pin,
                otpType: "resetPassword",
              });
            const { token } = res.data;
            setloading(false);
            router.push(`/password/reset/${token}`);
            }
          } catch (err: any) {
            setloading(false);
            if (err?.response?.status == 400) {
              toast({
                title: "Invalid otp",
                position: "top",
                variant: "left-accent",
                status: "error",
                duration: 10000,
                isClosable: true,
              });
            } else if (err?.response?.status == 401) {
              router.push("/404");
            } else {
              toast({
                title: "Something failed",
                position: "top",
                variant: "left-accent",
                status: "error",
                duration: 10000,
                isClosable: true,
              });
            }
          }
        })();

      console.log("hello");
    }
  }, [pin, toast, tok, router, url, verifType]);

  if(loading){
    return <Loader />
  }

  return (
    <motion.div
      key="token"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1 }}
    >
      <Flex
        bg="black"
        height="100vh"
        width="100%"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        m="auto"
        gap="2rem"
      >
        <Heading as="h1" fontSize="xl" fontWeight="bold" color="#fff">
          Input otp here
        </Heading>
        <Flex
          bg="#37254b"
          width={["90%", "70%", "50%", "30%"]}
          height="30%"
          placeItems="center"
          flexDir="row"
          justifyContent="center"
          boxShadow="7px 8px 9px black"
          rounded="lg"
        >
          <PinInput placeholder="_" onChange={handlePinChange} value={pin}>
            <PinInputField color="#fff" />
            <PinInputField color="#fff" />
            <PinInputField color="#fff" />
            <PinInputField color="#fff" />
            <PinInputField color="#fff" />
            <PinInputField color="#fff" />
          </PinInput>
        </Flex>
      </Flex>
    </motion.div>
  );
};

export default VerifyEmail;


export async function getServerSideProps(context: any) {
  const {
    params: { verifType, token },
    req,
    resolvedUrl,
  } = context;

  const url = process.env.API_URL;

  if (verifType != "register" && verifType != "password-reset") {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  console.log("req.url,", req.headers.referer);
  try {
    const resp = await axios.post(`${url}/users/isValidToken`, {
      token
    })      
    // return {
    //   redirect: {
    //     destination: resolvedUrl,
    //     permanent: false,
    //   },
    // };
    return {
      props: {
        verifType,
        token,
      },
    };

  } catch (err: any) {
    if(err.response.status == 401){
      return {
        redirect: {
          destination: "/verifyemail/password-reset/teach_finder/inputemail",
          permanent: false,
        },
      };
    }
  }

}
