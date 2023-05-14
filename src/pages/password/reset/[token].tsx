import { motion } from "framer-motion";
import {
  Box,
  Flex,
  Heading,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {forgotPasswordSchema} from '../../../../src/utils/validationSchemas/forgotPasswordSchema'
import RegisterFormInputs from "@/components/form/multistepForms/form1/inputs";

const ForgotPassword = () => {
  const [show, setShow] = useState(false);

  const formOptions = { resolver: yupResolver(forgotPasswordSchema) }
  const { register, handleSubmit, formState } = useForm(formOptions)

  const { errors } = formState

  console.log(errors)

  function onSubmit(data: any) {
    console.log(JSON.stringify(data, null, 4))
    return false
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
              >
                Reset password
              </Button>
            </form>
          </Box>
        </Flex>
      </Box>
    </motion.div>
  );
};

export default ForgotPassword;
