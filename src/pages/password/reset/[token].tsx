import { motion } from "framer-motion";
import { useRouter } from "next/router";
import {
  Box,
  Flex,
  Heading,
  Button,
  useToast
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ColorRing } from "react-loader-spinner";
import {forgotPasswordSchema} from '../../../../src/utils/validationSchemas/forgotPasswordSchema'
import RegisterFormInputs from "@/components/form/multistepForms/form1/inputs";
import axios from "axios";

const ForgotPassword = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const toast = useToast()
  const { token } = router.query;
  const [showloadingring, setShowloadingring] = useState(false);

  let url = process.env.NEXT_PUBLIC_API_URL;


  const formOptions = { resolver: yupResolver(forgotPasswordSchema) }
  const { register, handleSubmit, formState } = useForm(formOptions)

  const { errors } = formState

  console.log(errors)

  async function onSubmit(data: any) {

    const {password, confirmPwd} = data
    console.log(password)
    try{
      let res = await axios.post(`${url}/users/reset-password`, {
        password,
        confirmPassword: confirmPwd,
        token
      })

      router.push('/login')
    }catch(err: any){
      if (err.response?.status == 400) {
        setShowloadingring(false);
        toast({
          title: "Invalid Passwords!",
          position: "top",
          variant: "left-accent",
          status: "error",
          duration: 10000,
          isClosable: true,
        });
      }else if(err.response?.status == 401){
        setShowloadingring(false);
        router.push('/404')
      }else {
        setShowloadingring(false);
        console.log(err);
        toast({
          title:
            "An error occured. Please check internet connection",
          position: "top",
          variant: "left-accent",
          status: "error",
          duration: 10000,
          isClosable: true,
        });
      }
    }
  }

  return (
    <motion.div
      key="login"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box bg="#37254b" minH="100vh">
        <Flex
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          mx="auto"
          py="8rem"
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
            Reset Password
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
              onSubmit={handleSubmit(onSubmit)}
            >
              <RegisterFormInputs type="password" register={register} name="password" label="New Password" error={errors["password"]?.message}/>
              <RegisterFormInputs type="password" register={register} name="confirmPwd" label="Confirm Password" error={errors["confirmPwd"]?.message}/>

              <Button
                bg="#37254b"
                type="submit"
                transition=".5s"
                color="#fff"
                _hover={{ opacity: ".7" }}
                isDisabled={showloadingring}
              >{!showloadingring && "Reset password"}
                    {showloadingring && <ColorRing width={30} height={30} />}
                
              </Button>
            </form>
          </Box>
        </Flex>
      </Box>
    </motion.div>
  );
};

export default ForgotPassword;

export async function getServerSideProps(context: any) {
  const {
    params: { token },
  } = context;

  const url = process.env.API_URL;

  try {
    const res = await axios.post(`${url}/users/isValidToken`, {
      token
    })
  } catch (err: any) {
    if(err.response.status == 401){
      return {
        redirect: {
          destination: "/404",
          permanent: false,
        },
      };
    }
  }

  return {
    props: {
      token,
    },
  };
}