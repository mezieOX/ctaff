import { motion } from "framer-motion";
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
  PinInput,
  PinInputField,
  useToast,
  SimpleGrid,
  CircularProgress,
} from "@chakra-ui/react";
import { ColorRing } from "react-loader-spinner";
import { useState, useEffect, useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import RegisterFormInputs from "@/components/form/multistepForms/form1/inputs";
import { changePasswordSchema } from "@/utils/validationSchemas/changePasswordSchema";
import { forgotPasswordSchema } from "@/utils/validationSchemas/forgotPasswordSchema";
import axios from "axios";
import { logout } from "@/utils/logout";
import { animateUnderline } from "@/components/layout/navbar/navbarlink";
import { useRouter } from "next/router";
import { ArrowLeftIcon } from "@chakra-ui/icons";

const PasswordReset = () => {
  const { isOpen: showLoginErr, onClose, onOpen } = useDisclosure();
  const formOptions = { resolver: yupResolver(changePasswordSchema) };
  const formOptions2 = { resolver: yupResolver(forgotPasswordSchema) };

  const { register, handleSubmit, formState } = useForm(formOptions);
  const {
    register: registerRstPwd,
    handleSubmit: handleResetPwdSubmit,
    formState: formState2,
  } = useForm(formOptions2);

  const [errMessage, setErrMessage] = useState("");
  const [fgtpwdCarousel, setFgtpwdCarousel] = useState(false);
  const [rstpwdCarousel, setRstpwdCarousel] = useState(false);
  const [loaderOverlay, setLoaderOverlay] = useState(false);
  const [showloadingring, setshowloadingring] = useState(false);
  const [disablePinInput, setDisablePinInput] = useState(true);
  const [pin, setPin] = useState("");
  const toast = useToast();
  const { errors } = formState;
  const { errors: rstPwdErrors } = formState2;
  const router = useRouter();

  async function onSubmit(data: any) {
    setshowloadingring(true);
    try {
      const res = await axios.post("/api/users/changePassword", { ...data });
      console.log(res);
      setshowloadingring(false);
      toast({
        title: "Password change successful!",
        status: "success",
        isClosable: true,
      });
      setTimeout(() => {
        router.push("/dashboard/teacher");
      }, 2000);
    } catch (err: any) {
      handleError(err);
    }
  }

  async function onRstPwdSubmit(data: any) {
    setshowloadingring(true);
    console.log("data", data);
    try {
      const res = await axios.post("/api/users/resetAuthUserspassword", {
        ...data,
      });
      setshowloadingring(false);
      toggleMainCorousel();
      toast({
        title: "Password change successful!",
        status: "success",
        isClosable: true,
        duration: 10000,
      });
      // setTimeout(() => router.push('/dashboard/teacher/password-reset'), 2000)
      setTimeout(() => router.reload(), 2000);
    } catch (err: any) {
      handleError(err);
    }
  }

  async function handleSendResetCode() {
    setshowloadingring(true);
    try {
      const res: any = await axios.get("/api/users/sendResetAuthUsersOtp");
      toast({
        title:
          // err?.response?.data?.message ||
          "A token has been sent to your email. Please input code to continue",
        status: "info",
        isClosable: true,
        duration: 10000,
      });
      setshowloadingring(false);
      setDisablePinInput(false);
    } catch (err: any) {
      handleError(err);
    }
  }

  function handleError(err: any) {
    setshowloadingring(false);
    if (err.response?.status == 401 || err.response?.status == 403) {
      return logout(router, "/login");
    }
    toast({
      title: err?.response?.data?.message || "Something failed!",
      status: "error",
      isClosable: true,
    });
  }

  const toggleChangePwd = () => {
    setFgtpwdCarousel(!fgtpwdCarousel);
  };

  const toggleMainCorousel = () => {
    setFgtpwdCarousel(false);
    setRstpwdCarousel(false);
    setshowloadingring(false);
    setDisablePinInput(true);
    setPin("");
  };

  function toggleRstPwdCarousel() {
    setRstpwdCarousel(!rstpwdCarousel);
  }

  function handlePinChange(value: string) {
    setPin(value);
  }

  useLayoutEffect(() => {
    setLoaderOverlay(true);
    const overLayDisp = setTimeout(() => setLoaderOverlay(false), 1500);

    return () => clearTimeout(overLayDisp);
  }, [fgtpwdCarousel, rstpwdCarousel]);

  useEffect(() => {
    if (pin.length === 6) {
      setshowloadingring(true);
      (async function () {
        try {
          const res: any = await axios.post("/api/users/verifyAuthResetOtp", {
            otp: +pin,
          });
          setshowloadingring(false);
          setPin("");
          setRstpwdCarousel(!rstpwdCarousel);
        } catch (err: any) {
          setshowloadingring(false);
          setPin("");
          if (err.response?.status == 401 || err.response?.status == 403) {
            return logout(router, "/login");
          }
          toast({
            title: err?.response?.data?.message || "Something failed!",
            status: "error",
            isClosable: true,
          });
        }
      })();
    }
  }, [pin, router, toast, rstpwdCarousel]);

  return (
    <Flex
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      mx="auto"
      //   py="8rem"
      // bg="#37254b"
      w={["100%"]}
    >
      <Heading
        as="h1"
        fontSize="2rem"
        fontWeight="bold"
        lineHeight="tight"
        letterSpacing="tight"
        color="#000"
        mt={0}
        mb={4}
        mr="auto"
      >
        Change Password
        <Text fontWeight="500" fontSize="15px">
          (Inputs should not start or end with spaces)
        </Text>
      </Heading>
      {loaderOverlay && (
        <Flex
          h="100%"
          minH="30rem"
          w={["100%", "100%", "70%"]}
          rounded="lg"
          shadow="2xl"
          justifyContent="center"
          alignItems="center"
        >
          <ColorRing width={50} height={50} />
        </Flex>
      )}
      {!loaderOverlay && (
        <Box
          px={6}
          py={8}
          h="100%"
          minH="30rem"
          w={["100%", "100%", "70%"]}
          // bg="linear-gradient(50deg, rgba(-198, 2, 52, -1.99), gray);"
          // bg="#37254b"
          rounded="lg"
          shadow="xl"
        >
          <form
            style={{
              // display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "2rem",
              display: fgtpwdCarousel || rstpwdCarousel ? "none" : "flex",
            }}
            onSubmit={handleSubmit(onSubmit)}
          >
            {showLoginErr && (
              <Alert status="error">
                <AlertIcon />
                <AlertTitle>Invalid old password!</AlertTitle>
                <AlertDescription display={{ base: "none", lg: "flex" }}>
                  Recheck credentials and try again.
                </AlertDescription>
              </Alert>
            )}
            <RegisterFormInputs
              type="password"
              color="black"
              register={register}
              name="oldPassword"
              label="Old Password"
              disabled={showloadingring}
              error={errors["oldPassword"]?.message}
            />
            <RegisterFormInputs
              type="password"
              color="black"
              register={register}
              name="newPassword"
              label="New Password"
              pholder="(should be at least 8 characters long)"
              disabled={showloadingring}
              error={errors["newPassword"]?.message}
            />
            <RegisterFormInputs
              type="password"
              color="black"
              register={register}
              name="confirmNewPwd"
              label="Confirm New Password"
              disabled={showloadingring}
              error={errors["confirmNewPwd"]?.message}
            />
            <Box
              ml="auto"
              cursor="pointer"
              // onClick={toggleChangePwd}
              onClick={() => setFgtpwdCarousel(true)}
            >
              <Text
                color="#000"
                marginTop="-2rem"
                textDecoration="none"
                variant="none"
                position="relative"
                _hover={{
                  color: "#000",
                  _before: {
                    content: "''",
                    position: "absolute",
                    bottom: "-5px",
                    width: "100%",
                    height: "2px",
                    backgroundColor: "#000",
                    animation: `${animateUnderline} 0.3s forwards`,
                    transition:
                      "opacity 0.3s ease-out, transform 0.3s ease-out, visibility 0s 0.3s",
                  },
                }}
              >
                Forgot Password?
              </Text>
            </Box>

            <Button
              bg="#37254b"
              type="submit"
              transition=".5s"
              color="#fff"
              _hover={{ opacity: ".7" }}
              isDisabled={showloadingring}
            >
              {!showloadingring && "Change password"}
              {showloadingring && <ColorRing width={30} height={30} />}
            </Button>
          </form>

          <Box display={!fgtpwdCarousel || rstpwdCarousel ? "none" : "block"}>
            <Text textAlign="center" fontWeight={500} textDecor="underline">
              Proceed with password reset...
            </Text>
            <ArrowLeftIcon
              cursor={showloadingring ? "not-allowed" : "pointer"}
              onClick={!showloadingring ? toggleChangePwd : () => null}
            />
            <Flex
              flexDir="column"
              justifyContent="center"
              textAlign="center"
              alignItems="center"
              mt="3rem"
              gap="3rem"
            >
              <Button
                bg="#37254b"
                color="#fff"
                fontWeight="bold"
                transition="0.3s"
                // _hover={
                //   showloadingring || !disablePinInput
                //     ? ""
                //     : {
                //         bg: "rgba(0, 0, 0, .6)",
                //         border: "2px solid #fff",
                //         boxShadow: "7px 8px 9px black",
                //       }
                // }
                isDisabled={showloadingring || !disablePinInput}
                onClick={handleSendResetCode}
              >
                Get reset code
              </Button>

              <Flex
                bg="#37254b"
                width="fit-content"
                boxShadow="7px 8px 9px black"
                rounded="lg"
              >
                <PinInput
                  placeholder="_"
                  onChange={handlePinChange}
                  isDisabled={disablePinInput || showloadingring}
                  value={pin}
                  colorScheme="red"
                >
                  <PinInputField color="#fff" mr="7px" />
                  <PinInputField color="#fff" mr="7px" />
                  <PinInputField color="#fff" mr="7px" />
                  <PinInputField color="#fff" mr="7px" />
                  <PinInputField color="#fff" mr="7px" />
                  <PinInputField color="#fff" mr="7px" />
                </PinInput>
              </Flex>

              {showloadingring && (
                <CircularProgress size="30px" isIndeterminate pr={2} />
              )}
            </Flex>
          </Box>
          <form
            style={{
              // display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "2rem",
              display: !fgtpwdCarousel || !rstpwdCarousel ? "none" : "flex",
            }}
            onSubmit={handleResetPwdSubmit(onRstPwdSubmit)}
          >
            <ArrowLeftIcon cursor="pointer" onClick={toggleMainCorousel} />
            <Text textAlign="center" fontWeight={500} textDecor="underline">
              Reset password
            </Text>
            <RegisterFormInputs
              type="password"
              color="black"
              register={registerRstPwd}
              name="password"
              label="New Password"
              pholder="(should be at least 8 characters long)"
              disabled={showloadingring}
              error={rstPwdErrors["password"]?.message}
            />
            <RegisterFormInputs
              type="password"
              color="black"
              register={registerRstPwd}
              name="confirmPwd"
              label="Confirm New Password"
              disabled={showloadingring}
              error={rstPwdErrors["confirmPwd"]?.message}
            />
            <Button
              bg="#37254b"
              type="submit"
              transition=".5s"
              color="#fff"
              _hover={{ opacity: ".7" }}
              isDisabled={showloadingring}
            >
              {!showloadingring && "Reset password"}
              {showloadingring && (
                <CircularProgress size="30px" isIndeterminate pr={2} />
              )}
            </Button>
          </form>
        </Box>
      )}
    </Flex>
  );
};

export default PasswordReset;
