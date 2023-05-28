import {
  Button,
  Heading,
  Flex,
  FormControl,
  SimpleGrid,
  Stack,
  InputGroup,
  InputRightElement,
  FormLabel,
  Input,
  Box,
  CheckboxGroup,
  Checkbox,
  Select,
  Text,
} from "@chakra-ui/react";
import { ColorRing } from "react-loader-spinner";
import AvailabiltyInput from "./inputs";
import { DeleteIcon } from "@chakra-ui/icons";
import {useState, useEffect} from "react"
import { daysOfWeek } from "@/data/weekdays";

interface AvailabilityDetailsInterface {
  loadedAvailabilityData: any
  handleAvailabilityCheck: any;
  availabilityInfo: any;
  handleCheckboxes: any;
  handleOptionChange: any;
  handleSubjDelete: any;
  handleKeyDown: any;
  setSubjectVal: any;
  handleAddSubject: any;
  subjectVal: string;
  availabilityDetailsLoading: boolean;
}

const AvailabilityDetails = ({
  loadedAvailabilityData,
  handleAvailabilityCheck,
  availabilityInfo,
  handleCheckboxes,
  handleOptionChange,
  handleSubjDelete,
  handleKeyDown,
  setSubjectVal,
  handleAddSubject,
  subjectVal,
  availabilityDetailsLoading
}
: AvailabilityDetailsInterface) => {


  let [availabilityChanged, setAvailabilityChanged] = useState(false)
  
  useEffect(() => {
    if(JSON.stringify(loadedAvailabilityData) !== JSON.stringify(availabilityInfo)){
      setAvailabilityChanged(false)
    }else{
      setAvailabilityChanged(true)
    }
  }, [availabilityInfo, loadedAvailabilityData])

  return (
    <Box
      borderWidth="1px"
      rounded="lg"
      shadow="1px 3px 16px 4px rgba(1,1,1,0.1);"
      bg="#fff"
      p={6}
      w="100%"
      mt={5}
    >
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Teaching Availability Details
        <Text fontWeight="300" fontSize="15px">
          (Inputs should start or end with spaces)
        </Text>
      </Heading>

      <SimpleGrid columns={[1, 2]} spacing={["20px", "40px"]} mb="2%">
        <FormControl>
          <FormLabel>Select your availability:</FormLabel>
          <CheckboxGroup colorScheme="purple">
            <SimpleGrid column={1}>
              {daysOfWeek.map((day) => (
                <Stack direction="row" spacing={7} key={day}>
                  <Checkbox
                    isChecked={availabilityInfo.availableDays[day]?.am}
                    onChange={() => handleAvailabilityCheck(day, "am")}
                  >
                    {day} (AM)
                  </Checkbox>
                  <Checkbox
                    isChecked={availabilityInfo.availableDays[day]?.pm}
                    onChange={() => handleAvailabilityCheck(day, "pm")}
                  >
                    {day} (PM)
                  </Checkbox>
                </Stack>
              ))}
            </SimpleGrid>
          </CheckboxGroup>
        </FormControl>

        <SimpleGrid>
          <FormControl size="md">
            <Select
              name="teachingExperience"
              placeholder="-- Years of teaching experience --"
              focusBorderColor="brand.400"
              shadow="sm"
              bg="#fff"
              size="sm"
              w="full"
              rounded="md"
              value={availabilityInfo.levelDetails.teachingExperience}
              onChange={handleOptionChange}
            >
              <option value="none">None</option>
              <option value="Less than 6 months">Less than 6 months</option>
              <option value="6 - 12 months">6 - 12 months</option>
              <option value="1 - 2 years">1 - 2 years</option>
              <option value="More than 2years">More than 2years</option>
            </Select>
          </FormControl>
          <FormControl size="md">
            <Select
              name="highestDegree"
              placeholder="-- Highest degree obtained --"
              focusBorderColor="brand.400"
              shadow="sm"
              bg="#fff"
              size="sm"
              w="full"
              rounded="md"
              value={availabilityInfo.levelDetails.highestDegree}
              onChange={handleOptionChange}
            >
              <option value="olevel">O level</option>
              <option value="bsc">BSc.</option>
              <option value="msc">Msc.</option>
              <option value="phd">Phd</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>What level can you teach:</FormLabel>
            <CheckboxGroup
              colorScheme="green"
              value={availabilityInfo.teachableClass}
              onChange={handleCheckboxes}
            >
              <Stack direction="row" spacing={3}>
                <Checkbox value="primary">Primary</Checkbox>
                <Checkbox value="secondary">Secondary</Checkbox>
                <Checkbox value="tertiary">Tertiary</Checkbox>
              </Stack>
              {/* Repeat the same pattern for the other days of the week */}
            </CheckboxGroup>
          </FormControl>
        </SimpleGrid>
        <SimpleGrid>
          <FormControl mr="5%">
            <FormLabel fontWeight={"normal"}>
              What Subject(s) / Course(s) do you teach?
            </FormLabel>
            <InputGroup size="sm">
              <Input
                pr="4.5rem"
                type="text"
                placeholder="Input a subject"
                bg="#fff"
                value={subjectVal}
                onChange={(e) => setSubjectVal(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <InputRightElement
                bg="#000"
                width="20%"
                color="#fff"
                rounded="inherit"
              >
                <Button
                  rounded="inherit"
                  type="button"
                  width="100%"
                  height="100%"
                  bg="#717180"
                  onClick={handleAddSubject}
                  variant="none"
                  transition=".3s"
                  _hover={{ opacity: 0.8 }}
                >
                  Add
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <SimpleGrid column={1} spacing="1px">
            {availabilityInfo.subjects.map((subject: string, i: number) => (
              <Flex key={i} alignItems="center" flexDir="row" gap="2px">
                <Text>{subject}</Text>
                <DeleteIcon
                  cursor="pointer"
                  _hover={{ color: "red" }}
                  onClick={() => handleSubjDelete(i)}
                />
              </Flex>
            ))}
          </SimpleGrid>
        </SimpleGrid>
        <AvailabiltyInput
          label="State"
          name="availabilityState"
          handleChange={handleOptionChange}
          details={availabilityInfo.levelDetails}
        />
        <AvailabiltyInput
          label="City"
          name="availabilityCity"
          handleChange={handleOptionChange}
          details={availabilityInfo.levelDetails}
        />
      </SimpleGrid>
      <Flex justifyContent="flex-end">
        <Button
          id="form1-submit"
          type="submit"
          w="7rem"
          colorScheme="purple"
          isDisabled={availabilityDetailsLoading || availabilityChanged}
        >
        {!availabilityDetailsLoading && "Update"}
        {availabilityDetailsLoading && <ColorRing width={30} height={30} />}
      </Button>
      </Flex>
    </Box>
  );
};

export default AvailabilityDetails;
