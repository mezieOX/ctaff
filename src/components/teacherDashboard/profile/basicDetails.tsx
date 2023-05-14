import {
  Box,
  Heading,
  Text,
  Radio,
  Stack,
  RadioGroup,
  FormControl,
    FormLabel,
    SimpleGrid,
    Flex,
    Button,
} from "@chakra-ui/react";
import RegisterFormInputs from "@/components/form/multistepForms/form1/inputs";

interface BasicDetailsInterface {
    register: any
    errors: any
}

const BasicDetails = ({register, errors}: BasicDetailsInterface) => {
    return ( 
                          <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 3px 16px 4px rgba(1,1,1,0.1);"
        bg="#fff"
        p={6}
        pb={8}
        w="100%"
      >
        <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
          Basic details<Text fontWeight="300" fontSize="15px">(Inputs should not start or end with spaces)</Text>
        </Heading>

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
            required="yes"
              name="lastname"
              label="Last Name"
              type="text"
              register={register}
              error={errors?.lastname?.message}
            />
            <FormControl mr="5%">
              <FormLabel fontWeight={"normal"}>
                Gender
              </FormLabel>
              <RadioGroup>
                <Stack direction={["column", "column", "column", "row"]}>
                  <Radio value="male"  {...register("gender")}>
                    Male
                  </Radio>
                  <Radio value="female"  {...register("gender")}>
                    Female
                  </Radio>
                  <Radio value="non-binary"  {...register("gender")}>
                    Non-Binary
                  </Radio>
                  <Radio value="other"  {...register("gender")}>
                    Other
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <RegisterFormInputs
            required="yes"
            //   value="frank@gmail.com"
              name="email"
              label="Email"
              type="email"
              register={register}
              error={errors?.email?.message}
            />
            {/* <FormControl mr="5%" isRequired>
              <FormLabel htmlFor="picture" fontWeight={"normal"}>
                Upload your picture
              </FormLabel>
              <Input
                id="picture"
                name="picture"
                type="file"
                onChange={handleFileChange}
              />
            </FormControl> */}
            <RegisterFormInputs
            required="yes"
              name="phone"
              label="Phone"
              type="tel"
              pholder="eg. 09035627812"
              register={register}
              error={errors?.phone?.message}
            />
            <RegisterFormInputs
            required="yes"
              name="address"
              label="Address"
              type="text"
              register={register}
              error={errors?.phone?.message}
            />

            <RegisterFormInputs
            required="yes"
              name="city"
              label="City"
              type="text"
              register={register}
              error={errors?.city?.message}
            />
            <RegisterFormInputs
            required="yes"
              name="state"
              label="State of Origin"
              type="text"
              register={register}
              error={errors?.state?.message}
            />
            <RegisterFormInputs
            required="yes"
              name="country"
              label="Nationality"
              type="text"
              register={register}
              error={errors?.country?.message}
            />
            <RegisterFormInputs
            required="yes"
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
              Update
            </Button>
          </Flex>
      </Box>

     );
}
 
export default BasicDetails;