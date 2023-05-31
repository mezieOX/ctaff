import Navbar from "@/components/layout/navbar";
import {
  Box,
  Flex,
  Heading,
  Button,
  Text,
  useDisclosure,
  Alert,
  AlertIcon,
  AlertTitle,
  Select,
  FormControl,
  GridItem,
  useToast
} from "@chakra-ui/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ColorRing } from "react-loader-spinner";
import axios from "axios";
import { animateUnderline } from "@/components/layout/navbar/navbarlink";
import TextInput from "../../../components/form/textField";

const SignUpPis = ({pis}: {pis: string}) => {
  const { isOpen: showLoginErr, onClose, onOpen } = useDisclosure();
  const [showloadingring, setshowloadingring] = useState(false)
  const toast = useToast()
  let url = process.env.NEXT_PUBLIC_API_URL;

  const [signupInputs, setSignupInputs] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    usertitle: "",
    schoolname: "",
    phonenumber: ""
  });

    const handleOptionChange = (e: any) => {
    console.log(e.target.value);
    setSignupInputs({ ...signupInputs, usertitle: e.target.value });
  };

  const handleSignupFormSubmit = async (e: any) => {
    e.preventDefault();
    setshowloadingring(true)
    
    // alert(JSON.stringify(signupInputs, null, 2))
    let userData = signupInputs
    try{
      let data = await axios.post("/api/signup", {
        ...userData,
        role: pis
      })
      
      onClose()
      toast({
          title:
            "A verification link has been sent to your provided email. Please follow the link to verify account",
          position: "top",
          variant: "left-accent",
          isClosable: true,
          duration: 10000,
        });
      setshowloadingring(false)
      console.log(data)
    }catch(err: any){
      setshowloadingring(false)
      if(err.response?.status == 400){
        onOpen();
      }else{
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
      console.log(err)
    }
  };


  // useEffect(() => {
    // onOpen();
    // const showErrTimer = setTimeout(() => {
    //   onClose();
    // }, 6000);

  //   return () => {
  //     clearTimeout(showErrTimer);
  //   };
  // }, []);

  return (
    <>
      <motion.div
        key="signup"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Box bg="#37254b" minH="100vh" paddingBottom="2rem">
          <Navbar />
          <Flex
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            mx="auto"
            my="5rem"
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
              Create an account<Text fontWeight="300" fontSize="15px">(Inputs should not start or end with spaces)</Text>
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
                onSubmit={handleSignupFormSubmit}
              >
                {showLoginErr && (
                  <Alert status="error">
                    <AlertIcon />
                    <AlertTitle>Email already exist!</AlertTitle>
                  </Alert>
                )}

                <TextInput
                  label="FirstName"
                  type="text"
                  name="firstname"
                  setInputState={setSignupInputs}
                  inputsState={signupInputs}
                />
                <TextInput
                  label="LastName"
                  type="text"
                  name="lastname"
                  setInputState={setSignupInputs}
                  inputsState={signupInputs}
                />
                {pis === "school" && (<TextInput
                  label="SchoolName"
                  type="text"
                  name="schoolname"
                  setInputState={setSignupInputs}
                  inputsState={signupInputs}
                />)}
                <TextInput
                  label="Phone Number"
                  type="tel"
                  name="phonenumber"
                  setInputState={setSignupInputs}
                  inputsState={signupInputs}
                />
                <FormControl
                  as={GridItem}
                  colSpan={[6, 3]}
                  size="md"
                  isRequired
                >
                  <Select
                    name="applyingAs"
                    placeholder="-- Select Title --"
                    focusBorderColor="brand.400"
                    shadow="sm"
                    bg="#fff"
                    size="sm"
                    w="full"
                    rounded="md"
                    onChange={handleOptionChange}
                  >
                    <option value="mr">
                      Mr.
                    </option>
                    <option value="mrs">
                     Mrs.
                    </option>
                    <option value="miss">
                     Miss.
                    </option>
                  </Select>
                </FormControl>

                <TextInput
                  label="Email"
                  type="email"
                  name="email"
                  // helper="e.g iykelnhub@gmail.com"
                  // errormessage="Email invalid! Should be of the type: iykelnhub@gmail.com"
                  setInputState={setSignupInputs}
                  inputsState={signupInputs}
                />
                <TextInput
                  label="Password"
                  type="password"
                  name="password"
                  // helper={
                  //   signupInputs.password
                  //     ? ""
                  //     : "should be at least 8 characters"
                  // }
                  // errormessage="Password Unaccepted! Should be at least 8 characters long"
                  setInputState={setSignupInputs}
                  inputsState={signupInputs}
                />

                <Button
                  bg="#37254b"
                  type="submit"
                  transition=".5s"
                  color="#fff"
                  _hover={{ opacity: ".7" }}
                  isDisabled={showloadingring}
                >
                {!showloadingring && 'Sign Up'}{showloadingring && <ColorRing width={30} height={30}/>}
                </Button>
                <Link href="/login" shallow>
                  <Text
                    textDecoration="none"
                    variant="none"
                    color="white"
                    position="relative"
                    marginTop="-1rem"
                    maxW={["100%", "80%", "60%", "50%"]}
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
                    Have an account already? Sign In.
                  </Text>
                </Link>
              </form>
            </Box>
          </Flex>
        </Box>
      </motion.div>
    </>
  );
};

export default SignUpPis;

export async function getServerSideProps(context: any) {
  const { params: {pis} } = context;

  // const { pis } = params;

  if (pis != "school" && pis != "teacher_finder") {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  return {
    props: { 
      pis
    },
  };
}
