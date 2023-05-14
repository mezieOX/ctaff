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

} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import RegisterFormInputs from "@/components/form/multistepForms/form1/inputs";
import { changePasswordSchema } from "@/utils/validationSchemas/changePasswordSchema";

const PasswordReset = () => {
  const { isOpen: showLoginErr, onClose, onOpen } = useDisclosure();
    const formOptions = { resolver: yupResolver(changePasswordSchema) }
  const { register, handleSubmit, formState } = useForm(formOptions)

  const { errors } = formState
  console.log(formOptions)

  console.log(errors)

  function onSubmit(data: any) {
    // alert(JSON.stringify(data, null, 4))
    onOpen()
    return false
  }

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
          Change Password<Text fontWeight="500" fontSize="15px">(Inputs should not start or end with spaces)</Text>
        </Heading>
        <Box
          px={6}
          py={8}
          h="100%"
          w={["100%", "100%", "70%"]}
          // bg="linear-gradient(50deg, rgba(-198, 2, 52, -1.99), gray);"
          // bg="#37254b"
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
              error={errors["oldPassword"]?.message}
            />
            <RegisterFormInputs
              type="password"
              color="black"
              register={register}
              name="newPassword"
              label="New Password"
              pholder="(should be at least 8 characters long)"
              error={errors["newPassword"]?.message}
            />
            <RegisterFormInputs
              type="password"
              color="black"
              register={register}
              name="confirmNewPwd"
              label="Confirm New Password"
              error={errors["confirmNewPwd"]?.message}
            />

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
    );
}

export default PasswordReset