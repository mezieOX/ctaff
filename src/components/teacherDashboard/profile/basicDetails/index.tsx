import {
  Box,
  Heading,
  Text,
  Radio,
  RadioGroup,
  Stack,
  FormControl,
  FormLabel,
  SimpleGrid,
  Flex,
  Button,
} from "@chakra-ui/react";
import { ColorRing } from "react-loader-spinner";
import {useEffect, useState} from 'react'
import UpdateBasicDetails from "./inputs";

interface BasicDetailsInterface {
  data: any; 
  handleInputsChange: any; 
  handleGenderChange: any; 
  loadedData: any;
  showloadingring: boolean;
}

const BasicDetails = ({data, handleInputsChange, handleGenderChange, loadedData, showloadingring}: BasicDetailsInterface) => {

  // useEffect(() => {
  //   // window.location.reload()
  // }, [])

  let [openSubmit, setOpenSubmit] = useState(false)
  useEffect(() => {
    if(!Object.keys(data).length){
      setOpenSubmit(true)
    }else{
      setOpenSubmit(false)
    }
  }, [data] ) 

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
          Basic details
          <Text fontWeight="300" fontSize="15px">
            (Inputs should not start or end with spaces)
          </Text>
        </Heading>

        <SimpleGrid columns={[1, 2]} spacing={["20px", "40px"]} mb="2%">
          <UpdateBasicDetails
            name="firstname"
            handleInputsChange={handleInputsChange}
            label="First Name"
            type="text"
            loadedData={loadedData}
            data={data}
          />

          <UpdateBasicDetails
            name="lastname"
            handleInputsChange={handleInputsChange}
            label="Last Name"
            type="text"
            loadedData={loadedData}
            data={data}
          />
          <FormControl mr="5%">
            <FormLabel fontWeight={"normal"}>Gender</FormLabel>
            <RadioGroup
              onChange={handleGenderChange}
              value={loadedData["gender"]}
            >
              <Stack direction={["column", "column", "column", "row"]}>
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
                <Radio value="non-binary">Non-Binary</Radio>
                <Radio value="other">Other</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
          <UpdateBasicDetails
            name="phone"
            handleInputsChange={handleInputsChange}
            label="Phone"
            type="tel"
            loadedData={loadedData}
            data={data}
            pholder="eg. 09035627812"
          />
          <UpdateBasicDetails
            name="address"
            handleInputsChange={handleInputsChange}
            label="Address"
            type="text"
            loadedData={loadedData}
            data={data}
          />

          <UpdateBasicDetails
            name="city"
            handleInputsChange={handleInputsChange}
            label="City"
            type="text"
            loadedData={loadedData}
            data={data}
          />
          <UpdateBasicDetails
            name="stateOfOrigin"
            handleInputsChange={handleInputsChange}
            label="State of Origin (include your current state)"
            type="text"
            loadedData={loadedData}
            data={data}
          />
          <UpdateBasicDetails
            name="nationality"
            handleInputsChange={handleInputsChange}
            label="Nationality"
            type="text"
            loadedData={loadedData}
            data={data}
          />
          <UpdateBasicDetails
            name="currentOccupation"
            handleInputsChange={handleInputsChange}
            label="Current Occupation"
            type="text"
            loadedData={loadedData}
            data={data}
          />
        </SimpleGrid>
        <Flex justifyContent="flex-end">
          <Button
            id="form1-submit"
            type="submit"
            w="7rem"
            isDisabled={openSubmit || showloadingring}
            colorScheme="purple"
          >
            
            {!showloadingring && "Update"}
            {showloadingring && <ColorRing width={30} height={30} />}
          </Button>
        </Flex>
      </Box>
    );
}
 
export default BasicDetails;