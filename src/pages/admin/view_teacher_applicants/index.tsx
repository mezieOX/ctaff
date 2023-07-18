import {
  Box,
  Heading,
  SimpleGrid,
  Flex,
  Text,
  useDisclosure,
  useToast,
  Image,
} from "@chakra-ui/react";
// import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import AdminNav from "@/components/admin/nav";
import { formatSubjects } from "@/utils/helpers";
import BackButton from "@/components/layout/dashboardBackButton";
import { useRouter } from "next/router";
import DialogueModal from "@/components/admin/dialogueModal";
import { capitalize } from "@/utils/helpers";
import { setCookieToResponseHeader } from "@/utils/cookieHandler/setCookie";
import { deleteTokensInCookies } from "@/utils/cookieHandler/deleteCookie";
import { handleDialogueMessageSend } from "@/utils/handleTeacherAcceptReject";
import { headers } from "next/headers";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
// import cookie from "cookie"

const ViewTeacherApplicants = ({ applicants }: { applicants: any }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [dialogueModalMessage, setDialogueModalMessage] = useState("");
  const [action, setAction] = useState({ type: "", teacher_id: 0 });
  const [isSending, setIsSending] = useState(false);
  const [teachers, setTeachers] = useState(applicants);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const router = useRouter();

  const handleActivate = (index: number) => {
    setHoveredIndex(index);
  };

  const handleDeactivate = () => {
    setHoveredIndex(null);
  };

  const handleDialogueModalMessage = (e: any) => {
    setDialogueModalMessage(e.target.value);
  };

  const handleDialogueMessageSend = async () => {
    setIsSending(true);
    try {
      const { data } = await axios.post("/api/users/addRemoveTeach", {
        userId: action.teacher_id,
        action: action.type,
        message: dialogueModalMessage,
      });
      setIsSending(false);

      setTeachers(
        teachers.filter((obj: any) => obj.userId !== action.teacher_id)
      );

      onClose();
      toast({
        title: data,
        status: "success",
        isClosable: true,
      });

      // setTimeout(() => router.push(`/admin/view_teacher_applicants/`), 2000);
    } catch (err: any) {
      // console.log('erroo', err)
      setIsSending(false);
      toast({
        title:
          err?.response?.data?.message ||
          "Unable to send!. Please try again later",
        status: "error",
        isClosable: true,
      });
      // onClose();
    }
  };

  const teacherDetails = (id: any) => {
    router.push(`/admin/view_teacher_applicants/${id}`);
  };

  const handleOpenModalDialogue = (teacher_id: number, type: string) => {
    setAction({ type, teacher_id });
    onOpen();
  };

  return (
    <Box position="relative">
      <AdminNav />
      <Box
        bg="#37254b"
        shadow="1px 3px 16px 4px rgba(1,1,1,0.1);"
        minHeight="100vh"
        rounded="lg"
        mx="auto"
        my="4rem"
        w="95%"
        p="2rem"
        color="white"
      >
        <BackButton rbg="yes" />
        <DialogueModal
          isOpen={isOpen}
          onClose={onClose}
          dialogueModalMessage={dialogueModalMessage}
          handleDialogueModalMessage={handleDialogueModalMessage}
          handleDialogueMessageSend={handleDialogueMessageSend}
          isSending={isSending}
        />
        <Heading display="flex" justifyContent="center" textDecor="underline">
          Pending applications
        </Heading>
        <Box mt="5rem">
          {teachers.length ? (
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
              spacing="2rem"
            >
              {teachers?.map((data: any, index: number) => (
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
                >
                  <Box
                    //  objectFit="center"
                    objectFit="cover"
                    w="50%"
                    // h="50%"
                  >
                    {/* <Image
                      width={0}
                      height={0}
                      style={{ width: "100%", height: "100%" }}
                      alt="teacher"
                      src={data.picture}
                    /> */}
                    <Image
                      width="100%"
                      height="100%"
                      // style={{ width: "100%", height: "100%" }}
                      alt="teacher"
                      fallbackSrc={"/images/default-avatar.png"}
                      src={data.picture}
                    />
                  </Box>
                  <Flex
                    w="50%"
                    p="4px"
                    flexDir="column"
                    textAlign="center"
                    justifyContent="center"
                    padding="3px"
                  >
                    <Text fontWeight={500}>
                      {capitalize(data.firstname)} {capitalize(data.lastname)}
                    </Text>
                    <Text fontWeight={300}>
                      {formatSubjects(data.subjects)} Teacher
                    </Text>
                    {/* https://res.cloudinary.com/bluebberies/image/upload/v1686602077/profilePicture.jpg */}
                    {/* https://res.cloudinary.com/bluebberies/image/upload/v1687441226/christopher-campbell-rDEOVtE7vOs-unsplash_zvssxe.jpg */}
                    <Text fontWeight={500}>
                      {capitalize(data.city)}, {capitalize(data.nationality)}
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
                        <Text
                          onClick={() =>
                            handleOpenModalDialogue(data.userId, "accept")
                          }
                          cursor="pointer"
                          _hover={{ bg: "green" }}
                          transition=".2s"
                          py="5px"
                          px="8px"
                          rounded="lg"
                          border="2px solid green"
                        >
                          Accept
                        </Text>
                        <Text
                          onClick={() =>
                            handleOpenModalDialogue(data.userId, "reject")
                          }
                          cursor="pointer"
                          _hover={{ bg: "red" }}
                          transition=".2s"
                          py="5px"
                          px="8px"
                          rounded="lg"
                          border="2px solid red"
                        >
                          Reject
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
              No teacher Applicant
            </Text>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ViewTeacherApplicants;

export async function getServerSideProps({req, res}: {req: NextApiRequest, res: NextApiResponse}) {
  const url = process.env.API_URL;
  const { cookies } = req;
  const { refreshToken, accessToken } = cookies;
  try {
    const resp = await axios.get(
      `${url}/users/getTeacherApplicants?f=pending`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          refresh_token: refreshToken,
        },
      }
    );
    const { authorization, refresh_token } = resp.headers;
    const aT = authorization.replace("Bearer", "").trim();

    await setCookieToResponseHeader(res, refresh_token, aT);

    return {
      props: {
        applicants: resp.data,
      },
    };
  } catch (err: any) {
    if (err?.response?.status === 403 || err?.response?.status === 401) {
      await deleteTokensInCookies(res)

      return {
        redirect: {
          destination: `/admin/login`,
          permanent: true,
        },
      };
    }
    return {
      props: {
        applicants: [],
      },
    };
  }
}
