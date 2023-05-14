// const ProfilePage = () => {
//     return (<>
//         <h1>profile page</h1>
//     </>)
// }

// export default ProfilePage

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
  Radio,
  Stack,
  RadioGroup,
  FormControl,
FormLabel,
SimpleGrid
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import RegisterFormInputs from "@/components/form/multistepForms/form1/inputs";
import ConfimationDialogue from "@/components/form/multistepForms/form1/confirmationDialog"
import { updateProfileSchema } from "@/utils/validationSchemas/updateProfileSchema";
import BasicDetails from "./basicDetails"
import AvailabilityDetails from "./availabilityDetails"
import UserDetails from "./userDetails"
import OtherDetails from "./otherDetails"
// import Other

const ProfilePage = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const formOptions = { resolver: yupResolver(updateProfileSchema) }
  const { register, handleSubmit, formState } = useForm(formOptions)
  const [detail, setDetail] = useState("")

  const { errors } = formState
  console.log(formOptions)

  console.log(errors)

  function onFormSubmit(data: any) {
    if(detail === "basic"){
      alert(JSON.stringify(data, null, 4))
      return false
    }else if(detail === "availability"){
      alert("availability")
    }else if(detail === "user"){
      alert("user")
    }
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
        <ConfimationDialogue
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          handleSubmit={handleSubmit(onFormSubmit)}
        />
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
          Profile
          <Text fontWeight="500" fontSize="15px">
            (You can update and make changes to your profile)
          </Text>
        </Heading>
        <Box
          // px={6}
          py={8}
          h="100%"
          w={["100%", "100%", "80%"]}
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
            // onSubmit={handleSubmit(onSubmit)}
            onSubmit={(e) => {
              e.preventDefault();
              setDetail("basic");
              onOpen();
            }}
          >
            <BasicDetails errors={errors} register={register} />
          </form>

          <form
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "2rem",
            }}
            onSubmit={(e) => {
              e.preventDefault();
              setDetail("user");
              onOpen();
            }}
          >
            <UserDetails />
          </form>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "2rem",
            }}
            onSubmit={(e) => {
              e.preventDefault();
              setDetail("availability");
              onOpen();
            }}
          >
            <AvailabilityDetails />
          </form>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "2rem",
            }}
            onSubmit={(e) => {
            e.preventDefault();
            setDetail("user")
            onOpen();
          }}
          >
              <OtherDetails/>
          </form>
        </Box>
      </Flex>
    );
}

export default ProfilePage