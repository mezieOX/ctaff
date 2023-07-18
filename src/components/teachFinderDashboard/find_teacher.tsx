import {
  Box,
  useDisclosure,
  Flex,
  Text,
  SimpleGrid,
  Input,
  Image,
  Heading,
} from "@chakra-ui/react";
// import { FiUser } from "react-icons/fi";
import { formatSubjects } from "@/utils/helpers";
import { useEffect, useState } from "react";
import BackButton from "@/components/layout/dashboardBackButton";
import { useRouter } from "next/router";
import { capitalize } from "@/utils/helpers";

const FindTeacher = ({ teachers }: { teachers: any }) => {
  const [availTeachers, setAvailTeachers] = useState(teachers);
  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  // const toast = useToast();

  const handleActivate = (index: number) => {
    setHoveredIndex(index);
  };

  const handleDeactivate = () => {
    setHoveredIndex(null);
  };

  const handleSearch = (e: any) => {
    const val = e.target.value.trim().toString().toLowerCase();
    setAvailTeachers(
      teachers.filter((item: any) => {
        return (
          item.firstname.toLowerCase().includes(val) ||
          item.lastname.toLowerCase().includes(val))  ||
          item.city.toLowerCase().includes(val) ||
          item.availabilityLocation[0].city.toLowerCase().includes(val) ||
          item.availabilityLocation[0].state.toLowerCase().includes(val) ||
          item.gender.toLowerCase().includes(val) ||
          item.nationality.toLowerCase().includes(val) ||
          item.subjects.filter((o: any) => o.toLowerCase().includes(val)).length > 0 
      })
    );
  };

  const teacherDetails = (id: any) => {
    router.push(`/dashboard/teacher_finder/find_teacher/teacher/${id}`);
  };

  return (
    <Box minHeight="100vh" position="relative">
      <Box mx="2rem" my="5rem">
        <Box mt="3rem">
          <Flex
            w={{ base: "38rem", md: "50%" }}
            ml={{ base: "1px", md: "auto" }}
          >
            <Text>
              Search teachers using specific queries e.g state, location,
              gender, subject or name{" "}
            </Text>
            <Input
              onChange={handleSearch}
              placeholder="search for teacher"
              w="100%"
            />
          </Flex>
          <Box
            bg="#37254b"
            shadow="1px 3px 16px 4px rgba(1,1,1,0.1);"
            minHeight="100vh"
            rounded="lg"
            mx="auto"
            my="1rem"
            w="95%"
            p="2rem"
            color="white"
          >
            <BackButton rbg="yes" />
            <Heading
              display="flex"
              justifyContent="center"
              textDecor="underline"
            >
              Available Teachers
            </Heading>
            <Box mt="3rem">
              {availTeachers.length ? (
                <SimpleGrid
                  columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
                  spacing="2rem"
                >
                  {availTeachers?.map((data: any, index: number) => (
                    <Flex
                      key={index}
                      bg="#fff"
                      w="20rem"
                      minHeight="10rem"
                      height="auto"
                      color="#000"
                      flexDir="row"
                      boxShadow="-1px -2px 17px 3px black"
                      _hover={{
                        shadow: "1px 1px 11px 12px rgba(1,1,1,0.1)",
                      }}
                      rounded="lg"
                      overflow="hidden"
                      position="relative"
                      onMouseEnter={() => handleActivate(index)}
                      onMouseLeave={handleDeactivate}
                      // position="relative"
                    >
                      <Box objectFit="cover" w="50%">
                        <Image
                          width="100%"
                          height="100%"
                          alt="teacher"
                          fallbackSrc={"/images/default-avatar.png"}
                          src={data.picture}
                        />
                      </Box>
                      <Flex
                        w="50%"
                        p="6px"
                        flexDir="column"
                        textAlign="center"
                        justifyContent="center"
                      >
                        <Text fontWeight={500}>
                          {capitalize(data.firstname)}{" "}
                          {capitalize(data.lastname)}
                        </Text>
                        <Text fontWeight={300}>
                          {formatSubjects(data.subjects)} Teacher
                        </Text>
                        {/* https://res.cloudinary.com/bluebberies/image/upload/v1686602077/profilePicture.jpg */}
                        {/* https://res.cloudinary.com/bluebberies/image/upload/v1687441226/christopher-campbell-rDEOVtE7vOs-unsplash_zvssxe.jpg */}
                        <Text fontWeight={500}>
                          {capitalize(data.city)},{" "}
                          {capitalize(data.nationality)}
                        </Text>
                      </Flex>

                      {hoveredIndex === index && (
                        <Box
                          position="absolute"
                          top={0}
                          left={0}
                          width="100%"
                          height="100%"
                          bg="rgba(0, 0, 0, 0.5)"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Flex
                            direction="row"
                            alignItems="center"
                            gap="3rem"
                            color="#fff"
                          >
                            <Text
                              onClick={() => teacherDetails(data.userId)}
                              cursor="pointer"
                              _hover={{ bg: "blue" }}
                              transition=".2s"
                              py="5px"
                              px="8px"
                              rounded="lg"
                              border="2px solid blue"
                            >
                              View
                            </Text>
                          </Flex>
                        </Box>
                      )}
                    </Flex>
                  ))}
                </SimpleGrid>
              ) : (
                <Text
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  fontSize="1.5rem"
                >
                  Sorry! No Available Teacher.
                </Text>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FindTeacher;
