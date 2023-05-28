import {
  Image,
  Flex,
  FormControl,
  SimpleGrid,
  Stack,
  FormLabel,
  Input,
  Box,
  CheckboxGroup,
  Checkbox,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { daysOfWeek } from "@/data/weekdays";
import {formatSubjects} from "@/utils/helpers"
import {capitalize} from "@/utils/helpers"
import BackButton from "@/components/layout/dashboardBackButton";
import {useState} from "react"
import {useRouter} from "next/router"
import AdminNav from "@/components/admin/nav";
import { AvailabilityInfo } from "@/components/teacherDashboard/profile";
import DialogueModal from "@/components/admin/dialogueModal"

const ViewRecruitedTeachers = () => {
    const router = useRouter()

  let fakeTeacherData = [
    {id: 1, firstname: "Frank", lastname:"lungaga", subjects:["biology", "agric", "grete"], city: "Lagos", state: "Nigeria"},
    {id: 2, firstname: "Frank", lastname:"lungaga", subjects:["biology", "agric", "grete"], city: "Lagos", state: "Nigeria"},
    {id: 3, firstname: "Frank", lastname:"lungaga", subjects:["biology", "agric", "grete"], city: "Lagos", state: "Nigeria"},
    {id: 4, firstname: "Frank", lastname:"lungaga", subjects:["biology", "agric", "grete"], city: "Lagos", state: "Nigeria"},
  ]

  const teacherDetails = (id: any) => {
    router.push(`/admin/view_recruited_teachers/${id}`)
  }

  const [availabilityInfo, setAvailabilityInfo] =
    useState<AvailabilityInfo>({
      levelDetails: {
        teachingExperience: "Less than 6 months",
        highestDegree: "bsc",
        availabilityState: "Abuja",
        availabilityCity: "Gwagwa",
      },
      subjects: ["maths", "physics"],
      teachableClass: ["tertiary"],
      availableDays: {
        // Monday: {
        //   am: false,
        //   pm: true,
        // },
      },
    });

  const handleAvailabilityCheck = (day: string, period: "am" | "pm") => {
    setAvailabilityInfo((prevAvailabilityInfo: any) => {
      const updatedDays = { ...prevAvailabilityInfo.availableDays };

      if (updatedDays[day]) {
        updatedDays[day][period] = !updatedDays[day][period];
      } else {
        updatedDays[day] = { [period]: true };
      }

      return {
        ...prevAvailabilityInfo,
        availableDays: updatedDays,
      };
    });
  };


  return (
    <Box minHeight="100vh" position="relative">
      <Box mx="2rem" my="5rem">
        <Box>
          <AdminNav/>
        </Box>

        <BackButton/>
        <Box mt="3rem">
          <Flex w={{base: "38rem", md:"50%"}} ml={{base:"1px", md:"auto"}}>
            <Text>
              Search teachers using specific queries e.g state, location, gender,
              subject or name{" "}
            </Text>
            <Input placeholder="search for teacher" w="100%"/>
          </Flex>

          <Flex marginRight="auto">
            <FormControl>
              <FormLabel>Filter teachers by availability</FormLabel>
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
          </Flex>

          <SimpleGrid mt="3rem" columns={{md: 1, lg: 2, xl: 3}} spacing="2rem" padding="1rem">
            {fakeTeacherData.map((data, index) => (
              <Flex
                onClick={() => teacherDetails(data.id)}
                key={index}
                w="30rem"
                minHeight="15rem"
                height="auto"
                cursor="pointer"
                flexDir="row"
                _hover={{
                  shadow: "1px 1px 11px 12px rgba(1,1,1,0.1)",
                }}
                shadow="1px 3px 16px 4px rgba(1,1,1,0.1);"
                rounded="lg"
                overflow="hidden"
              >
                <Box objectFit="center" w="50%">
                  <Image
                    width="100%"
                    height="100%"
                    alt="teacher"
                    src="https://res.cloudinary.com/bluebberies/image/upload/v1684218709/pg2q4plxrvlnqsqtqhwx.jpg"
                  />
                </Box>
                <Flex w="50%" p="4px" flexDir="column" textAlign="center" justifyContent="center">
                  <Text fontWeight={500}>{data.firstname} {data.lastname}</Text>
                  <Text fontWeight={500}>{formatSubjects(data.subjects)} Teacher</Text>
                  <Text fontWeight={500}>{data.city}, {data.state}</Text>
                </Flex>
              </Flex>
            ))}
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
};

export default ViewRecruitedTeachers