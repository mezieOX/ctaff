import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Button,
  Heading,
  Flex,
  FormControl,
  SimpleGrid,
  Stack,
  RadioGroup,
  Radio,
  FormLabel,
  Input,
  Box,
  useToast,
  useDisclosure,
  Text
} from "@chakra-ui/react";
import RegisterFormInputs from "./inputs";
import ConfimationDialogue from "./confirmationDialog";
import { PersonalDetailsSchema } from "../../../../utils/validationSchemas/personalDetailsSchema";

type FormData = yup.InferType<typeof PersonalDetailsSchema>;

export default function Form1({
  handleTeacherFormSubmit,
}: {
  handleTeacherFormSubmit: any;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(PersonalDetailsSchema),
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  let [picture, setPicture] = useState(null);

  const toast = useToast();

  let teacherData;

  const onSubmit = (data: FormData) => {
    // onOpen()
    let allData = { ...data, picture };
    // teacherData = {...data, picture}
    // console.log({...data, picture})
    handleTeacherFormSubmit(allData);
  };

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    const acceptedFileTypesRegex = /\.(jpg|jpeg|png)$/i;
    if (selectedFile && acceptedFileTypesRegex.test(selectedFile.name)) {
      setPicture(selectedFile);
    } else {
      e.target.value = "";
      toast({
        title: "Invalid file type",
        status: "error",
        isClosable: true,
      });
    }
  };

  // function handleNextForm(){
  //   let submitButton = document.getElementById("form1-submit")
  //   submitButton.click()
  //   console.log("hello", submitButton)
  // }

  return (
    <motion.div
      key="form1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ConfimationDialogue
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        handleSubmit={handleSubmit(onSubmit)}
      />
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 3px 16px 17px rgba(0,0,0,0.3);"
        bg="#fff"
        p={6}
        w="100%"
      >
        <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
          Basic details<Text fontWeight="300" fontSize="15px">(Inputs should not start or end with spaces)</Text>
        </Heading>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onOpen();
          }}
        >
          <SimpleGrid columns={[1, 2]} spacing={["20px", "40px"]} mb="2%">
            <RegisterFormInputs
              required="yes"
              name="firstname"
              label="First Name"
              type="text"
              register={register}
              error={errors?.firstname?.message}
            />

            <RegisterFormInputs
              name="lastname"
              label="Last Name"
              type="text"
              register={register}
              error={errors?.lastname?.message}
            />
            <FormControl mr="5%" isRequired>
              <FormLabel htmlFor="null" fontWeight={"normal"}>
                Gender
              </FormLabel>
              <RadioGroup onChange={(e) => console.log(e)}>
                <Stack direction={["column", "column", "row"]}>
                  <Radio value="male" {...register("gender")}>
                    Male
                  </Radio>
                  <Radio value="female" {...register("gender")}>
                    Female
                  </Radio>
                  <Radio value="non-binary" {...register("gender")}>
                    Non-Binary
                  </Radio>
                  <Radio value="other" {...register("gender")}>
                    Other
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <RegisterFormInputs
              disabled={true}
              value="frank@gmail.com"
              name="email"
              label="Email"
              type="email"
              register={register}
              // error={errors?.address.}
            />
            <FormControl mr="5%" isRequired>
              <FormLabel htmlFor="picture" fontWeight={"normal"}>
                Upload your picture
              </FormLabel>
              <Input
                id="picture"
                name="picture"
                type="file"
                onChange={handleFileChange}
              />
            </FormControl>
            <RegisterFormInputs
              name="phone"
              label="Phone"
              type="tel"
              pholder="eg. 09035627812"
              register={register}
              error={errors?.phone?.message}
            />
            <RegisterFormInputs
              name="address"
              label="Address"
              type="text"
              register={register}
              error={errors?.phone?.message}
            />

            <RegisterFormInputs
              name="city"
              label="City"
              type="text"
              register={register}
              error={errors?.city?.message}
            />
            <RegisterFormInputs
              name="state"
              label="State of Origin"
              type="text"
              register={register}
              error={errors?.state?.message}
            />
            <RegisterFormInputs
              name="country"
              label="Nationality"
              type="text"
              register={register}
              error={errors?.country?.message}
            />
            <RegisterFormInputs
              name="occupation"
              label="Current Occupation"
              type="text"
              register={register}
              error={errors?.occupation?.message}
            />
          </SimpleGrid>
          <Flex justifyContent="flex-end">
            <Button
              id="form1-submit"
              type="submit"
              w="7rem"
              isDisabled={false}
              colorScheme="purple"
            >
              Next
            </Button>
          </Flex>
        </form>
      </Box>
    </motion.div>
  );
}
