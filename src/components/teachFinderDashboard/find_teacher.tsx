import {
  Box,
  useDisclosure,
  Flex,
  Text,
  SimpleGrid,
  Input,
  Image
} from "@chakra-ui/react";
// import { FiUser } from "react-icons/fi";
import {formatSubjects} from "@/utils/helpers"
import { useEffect, useState } from "react";
import BackButton from "@/components/layout/dashboardBackButton";
import {useRouter} from "next/router"
import TeachFinderNav from "./tf_nav"

const FindTeacher = () => {
  const [greeting, setGreeting] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
    const router = useRouter()



  let fakeTeacherData = [
    {id: 1, firstname: "Frank", lastname:"lungaga", subjects:["biology", "agric", "grete"], city: "Lagos", state: "Nigeria"},
    {id: 2, firstname: "Frank", lastname:"lungaga", subjects:["biology", "agric", "grete"], city: "Lagos", state: "Nigeria"},
    {id: 3, firstname: "Frank", lastname:"lungaga", subjects:["biology", "agric", "grete"], city: "Lagos", state: "Nigeria"},
    {id: 4, firstname: "Frank", lastname:"lungaga", subjects:["biology", "agric", "grete"], city: "Lagos", state: "Nigeria"},
  ]

  const teacherDetails = (id: any) => {
    router.push(`/dashboard/teacher_finder/find_teacher/teacher/${id}`)
  }


  return (
    <Box minHeight="100vh" position="relative">
      <Box mx="2rem" my="5rem">
        <Box>
          <TeachFinderNav/>
        </Box>
        <BackButton/>
        {/* "https://res.cloudinary.com/bluebberies/image/upload/v1684218709/pg2q4plxrvlnqsqtqhwx.jpg" */}
        <Box mt="3rem">
          <Flex w={{base: "38rem", md:"50%"}} ml={{base:"1px", md:"auto"}}>
            <Text>
              Search teachers using specific queries e.g state, location, gender,
              subject or name{" "}
            </Text>
            <Input placeholder="search for teacher" w="100%"/>
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
                {/* <Box objectFit="center" w="50%"> */}
                <Box objectFit="cover" w="50%">
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

export default FindTeacher;
