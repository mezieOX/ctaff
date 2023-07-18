import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import { useState } from "react";
import { ColorRing } from "react-loader-spinner";
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
  useToast,
  useDisclosure,
  CheckboxGroup,
  Checkbox,
  Select,
  Text,
} from "@chakra-ui/react";
import AvailabiltyInput from "./inputs";
import ConfimationDialogue from "../../multistepForms/form1/confirmationDialog";
import { DeleteIcon } from "@chakra-ui/icons";
import { PersonalDetailsSchema } from "../../../../utils/validationSchemas/personalDetailsSchema";

type FormData = yup.InferType<typeof PersonalDetailsSchema>;

function Form1({ handleTeacherFormSubmit, showloadingring }: { handleTeacherFormSubmit: any, showloadingring: boolean }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  let [picture, setPicture] = useState(null);

  const toast = useToast();

  const onSubmit = (data: FormData) => {
    // onOpen()
    let allData = { ...data, picture };
    // teacherData = {...data, picture}
    // console.log({...data, picture})
    handleTeacherFormSubmit(allData);
  };

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const [availability, setAvailability] = useState<any>({});
  const [subjectVal, setSubjectVal] = useState("");
  const [subjects, setSubjects] = useState<string[]>([]);
  const [levelDetails, setLevelDetails] = useState({
    teachingExperience: "",
    highestDegree: "",
    availabilityState: "",
    availabilityCity: "",
  });

  const [teachableClass, setTeachableClass] = useState<string[]>([]);

  function handleTeachableClassCheck(checkedValue: string) {
    if (teachableClass.includes(checkedValue)) {
      setTeachableClass(
        teachableClass.filter((value) => value !== checkedValue)
      );
    } else {
      setTeachableClass([...teachableClass, checkedValue]);
    }
  }

  const handleAvailabilityCheck = (day: string, period: string) => {
    const updatedAvailability = {
      ...availability,
      [day]: {
        ...availability[day],
        [period]: !availability[day]?.[period],
      },
    };
    setAvailability(updatedAvailability);
  };

  const handleAddSubject = () => {
    let newSubj = subjectVal.trim();
    if (newSubj) {
      setSubjects([...subjects, newSubj]);
      setSubjectVal("");
    }
  };

  const handleSubjDelete = (index: number) => {
    setSubjects(subjects.filter((subjects, i) => i !== index));
    console.log(index);
  };

  const handleOptionChange = (e: any) => {
    const { name, value } = e.target;
    setLevelDetails({ ...levelDetails, [name]: value });
  };

  const isAtLeastOneAvailabilityChecked = () => {
    for (const day in availability) {
      if (availability[day].am || availability[day].pm) {
        return true;
      }
    }
    return false;
  };

  function handleKeyDown(event: any) {
    if (event.key === "Enter") {
      handleAddSubject()
    }
  }

  const handleForm4Submit = (e: any) => {
    e.preventDefault();

    // onOpen();
    if (!isAtLeastOneAvailabilityChecked()) {
      toast({
        title: "Please select your available day(s)",
        position: "top",
        variant: "left-accent",
        status: "error",
        isClosable: true,
      });
    } else if (!teachableClass.length) {
      toast({
        title: "Please select teachable class(es)",
        position: "top",
        variant: "left-accent",
        status: "error",
        isClosable: true,
      });
    } else {
      onOpen();
    }
  };

  const handleNextPage = () => {
    let availableDays: any = {}


    

    for (const day in availability) {
      if (availability[day].am || availability[day].pm) {
        availableDays[day] = availability[day]
      }
    }
    
    const data = {
    ...levelDetails,
    teachableClass,
    subjects,
    availableDays
    }

    handleTeacherFormSubmit(data)
  }

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
        handleSubmit={handleNextPage}
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
          Teaching Availability Details
          <Text fontWeight="300" fontSize="15px">
            (Inputs should start or end with spaces)
          </Text>
        </Heading>

        <form
          onSubmit={
            //   (e) => {
            //   e.preventDefault();
            //   onOpen();
            // }
            handleForm4Submit
          }
        >
          <SimpleGrid columns={[1, 2]} spacing={["20px", "40px"]} mb="2%">
            <FormControl>
              <FormLabel>Select your availability:</FormLabel>
              <CheckboxGroup colorScheme="purple">
                <SimpleGrid column={1}>
                  {daysOfWeek.map((day) => (
                    <Flex direction="row" justifyContent="space-between" key={day}>
                      <Checkbox
                        onChange={() => handleAvailabilityCheck(day, "am")}
                      >
                        {day} (AM)
                      </Checkbox>
                      <Checkbox
                        onChange={() => handleAvailabilityCheck(day, "pm")}
                      >
                        {day} (PM)
                      </Checkbox>
                    </Flex>
                  ))}
                </SimpleGrid>
              </CheckboxGroup>
            </FormControl>

            <SimpleGrid>
              <FormControl size="md" isRequired>
                <Select
                  name="teachingExperience"
                  placeholder="-- Years of teaching experience --"
                  focusBorderColor="brand.400"
                  shadow="sm"
                  bg="#fff"
                  size="sm"
                  w="full"
                  rounded="md"
                  onChange={handleOptionChange}
                >
                  <option value="none">None</option>
                  <option value="Less than 6 months">Less than 6 months</option>
                  <option value="6 - 12 months">6 - 12 months</option>
                  <option value="1 - 2 years">1 - 2 years</option>
                  <option value="More than 2years">More than 2years</option>
                </Select>
              </FormControl>
              <FormControl size="md" isRequired>
                <Select
                  name="highestDegree"
                  placeholder="-- Highest degree obtained --"
                  focusBorderColor="brand.400"
                  shadow="sm"
                  bg="#fff"
                  size="sm"
                  w="full"
                  rounded="md"
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
                <CheckboxGroup colorScheme="green">
                  <Stack direction="row" spacing={3}>
                    <Checkbox
                      onChange={() => handleTeachableClassCheck("primary")}
                    >
                      Primary
                    </Checkbox>
                    <Checkbox
                      onChange={() => handleTeachableClassCheck("secondary")}
                    >
                      Secondary
                    </Checkbox>
                    <Checkbox
                      onChange={() => handleTeachableClassCheck("tertiary")}
                    >
                      Tertiary
                    </Checkbox>
                  </Stack>
                  {/* Repeat the same pattern for the other days of the week */}
                </CheckboxGroup>
              </FormControl>
            </SimpleGrid>
            <SimpleGrid>
              <FormControl mr="5%" isRequired={!subjects.length}>
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
                {subjects.map((subject, i) => (
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
              details={levelDetails}
            />
            <AvailabiltyInput
              label="City"
              name="availabilityCity"
              handleChange={handleOptionChange}
              details={levelDetails}
            />
          </SimpleGrid>
          <Flex justifyContent="flex-end">
            <Button
              id="form1-submit"
              type="submit"
              w="7rem"
              isDisabled={showloadingring}
              colorScheme="purple"
            >
              {!showloadingring && "Next"}
              {showloadingring && <ColorRing width={30} height={30} />}
            </Button>
          </Flex>
        </form>
      </Box>
    </motion.div>
  );
}

export default Form1;
