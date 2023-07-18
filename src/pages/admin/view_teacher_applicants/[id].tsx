import {
  Box,
  Badge,
  Divider,
  Flex,
  Text,
  Button,
  useToast,
  ListItem,
  Image,
  useDisclosure,
  OrderedList,
} from "@chakra-ui/react";
// import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import BackButton from "@/components/layout/dashboardBackButton";
import DialogueModal from "@/components/admin/dialogueModal";
import UserDetails from "@/components/admin/userDetails";
import PreviewCertificationModal from "@/components/admin/previewCertificationModal";
import EmploymentItem from "@/components/admin/employmentLists";
import UnorderedLists from "@/components/admin/unorderedLists";
import Education from "@/components/admin/educationLists";
import OtherCertifications from "@/components/admin/otherCertifications";
import axios from "axios";
import { setCookieToResponseHeader } from "@/utils/cookieHandler/setCookie";
import { headers } from "next/dist/client/components/headers";

const ViewTeacher = ({ tData }: { tData: any }) => {
  const [teacher, setTeacher] = useState({});
  const [dialogueModalMessage, setDialogueModalMessage] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [action, setAction] = useState({ type: "", teacher_id: 0 });
  // const [teacherData, setTeacherData] =
  const [isSending, setIsSending] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isPreviewCertiOpen,
    onOpen: openPreviewCertification,
    onClose: closePreviewCertification,
  } = useDisclosure();
  const toast = useToast();
  const router = useRouter();
  console.log(tData);
  // const { id } = router.query;
  // let transformedId = +router?.query?.id || 0
  let transformedId: number;

  if (router?.query?.id && +router?.query?.id)
    transformedId = +router?.query?.id;
  else transformedId = 0;

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
      onClose();
      toast({
        title: data,
        status: "success",
        isClosable: true,
      });
      setTimeout(() => router.push(`/admin/view_teacher_applicants/`), 2000);
    } catch (err: any) {
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

  const handleOpenModalDialogue = (teacher_id: number, type: string) => {
    setAction({ type, teacher_id });
    onOpen();
  };

  const checkIfDocument = (url: string) => {
    const fileExtension = url?.split(".").pop()?.toLowerCase();
    const supportedDocumentFormats = [
      "pdf",
      "doc",
      "docx",
      "xls",
      "xlsx",
      "ppt",
      "pptx",
    ];
    // openPreviewCertification()
    return fileExtension && supportedDocumentFormats.includes(fileExtension);
  };

  const handlePreviewCertificationModal = (
    url: string,
  ) => {
    console.log('setFileUrl', url)
    if (checkIfDocument(url)) {
      window.open(url, "_blank");
    } else {
      setFileUrl(url);
      openPreviewCertification();
    }
  };

  return (
    <motion.div
      key="teacher"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box minHeight="100vh" mx={{ base: "1rem", md: "3rem" }} my="3rem">
        <BackButton />
        <DialogueModal
          isOpen={isOpen}
          onClose={onClose}
          dialogueModalMessage={dialogueModalMessage}
          handleDialogueModalMessage={handleDialogueModalMessage}
          handleDialogueMessageSend={handleDialogueMessageSend}
          isSending={isSending}
        />
        <PreviewCertificationModal
          onClose={closePreviewCertification}
          isOpen={isPreviewCertiOpen}
          fileUrl={fileUrl}
        />
        {!tData.falsy ? (
          <>
            <Flex
              gap="2rem"
              height="auto"
              flexDirection={{ base: "column", md: "row" }}
              alignItems="center"
              pos="relative"
            >
              <Box
                // objectFit="center"
                objectFit="cover"
                w={{ base: "100%", md: "70%", lg: "60%" }}
                rounded="lg"
                overflow="hidden"
              >
                <Image
                  width="100%"
                  height="100%"
                  src={tData?.teacher?.picture}
                  fallbackSrc={"/images/avatarImg.png"}
                  alt="teacher"
                />
                {/* <Image
                  width={0}
                  height={0}
                  style={{ width: "100%", height: "100%" }}
                  alt="teacher"
                  src={tData?.teacher?.picture}
                /> */}
              </Box>
              <Flex
                w={{ base: "100%", md: "70%", lg: "50%" }}
                flexDir="column"
                gap=".5rem"
              >
                <UserDetails title="Firstname" value={tData.firstname} />
                <UserDetails title="Lastname" value={tData.lastname} />
                <UserDetails title="Gender" value={tData.teacher?.gender} />
                <UserDetails title="Phone" value={tData.phone} />
                <UserDetails title="Email" value={tData.email} />
                <UserDetails title="Address" value={tData.teacher?.address} />
                <UserDetails title="City" value={tData.teacher?.city} />
                <UserDetails
                  title="State of origin"
                  value={tData.teacher?.stateOfOrigin}
                />
                <UserDetails
                  title="Nationality"
                  value={tData.teacher?.nationality}
                />
                <UserDetails
                  title="Level of Education"
                  value={tData.teacher?.basicEdu?.level}
                />
                <Box
                  display="flex"
                  gap="1rem"
                  fontSize={{ md: "17px", xl: "1.5rem" }}
                  alignItems="center"
                >
                  <Text fontWeight="500">Availability status:</Text>
                  <Badge
                    colorScheme="green"
                    display="flex"
                    height="25px"
                    rounded="lg"
                    justifyContent="center"
                    alignItems="center"
                  >
                    Available
                  </Badge>
                </Box>
                <UserDetails title="Highest Degree Obtained" value="Bsc." />
                <UserDetails
                  title="Years of teaching experience"
                  value="6 - 12 months"
                />
              </Flex>
            </Flex>
            <Divider mt="3rem" borderWidth="1px" borderColor="gray" />
            <Box>
              <Flex flexDir="column" mt="2rem">
                <Text
                  fontWeight="700"
                  fontSize={{ base: "17px", md: "1.5rem" }}
                  textDecor="underline"
                >
                  O&apos;Level result
                </Text>
                <Box
                  objectFit="contain"
                  cursor="pointer"
                  w={{ base: "100%", md: "30%", lg: "10%" }}
                  h="10rem"
                  rounded="lg"
                  overflow="hidden"
                  onClick={() =>
                    handlePreviewCertificationModal(
                      tData.teacher.basicEdu?.oLevelResult
                    )
                  }
                >
                  {!checkIfDocument(tData.teacher.basicEdu?.oLevelResult) ? (
                    <Image
                      width="100%"
                      height="100%"
                      src={tData.teacher.basicEdu?.oLevelResult}
                      alt="teacher"
                    />
                  ) : (
                    // <Image
                    //   width={0}
                    //   height={0}
                    //   style={{ width: "100%", height: "100%" }}
                    //   alt="teacher"
                    //   src={tData.basicEdu?.olevelResult}
                    // />
                    <Flex
                      alignItems="center"
                      justifyContent="center"
                      bg="gray"
                      color="#fff"
                      width="100%"
                      height="100%"
                    >
                      File
                    </Flex>
                  )}
                </Box>
              </Flex>
              <UnorderedLists
                name="Skill(s)"
                type="skill"
                data={tData.teacher?.skills}
              />

              <UnorderedLists
                name="Language(s)"
                type="lang"
                data={tData.teacher?.languages}
              />

              <UnorderedLists
                type="availDays"
                name="Availability Days"
                data={tData.teacher?.availabilityDays}
              />

              <Flex flexDir="column" mt="2rem">
                <Text
                  fontWeight="700"
                  fontSize={{ base: "17px", md: "1.5rem" }}
                  textDecor="underline"
                >
                  Availability Location
                </Text>
                <Box display="flex" gap=".5rem" alignItems="center">
                  <Text fontWeight="700">City:</Text>{tData.teacher?.availabilityLocation[0].city}
                </Box>
                <Box display="flex" gap=".5rem" alignItems="center">
                  <Text fontWeight="700">State:</Text>{tData.teacher?.availabilityLocation[0].state}
                </Box>
              </Flex>

              <UnorderedLists
                // type="teachSubjs"
                name="Teachable Subject(s)"
                data={tData.teacher?.teachableSubjects?.map(
                  (item: any) => item.subject
                )}
              />

              <Flex flexDir="column" mt="2rem">
                <Text
                  fontWeight="700"
                  fontSize={{ base: "17px", md: "1.5rem" }}
                  textDecor="underline"
                >
                  Employment Details
                </Text>
                {tData.teacher?.employmentDetails.length > 0 ? (
                  <OrderedList spacing="2rem">
                    {tData.teacher?.employmentDetails?.map(
                      (item: any, i: number) => (
                        <EmploymentItem
                          key={i}
                          jobTitle={item.jobTitle}
                          employers={item.employers}
                          city={item.city}
                          description={item.description}
                          period={item.startDate + " - " + item.endDate}
                        />
                      )
                    )}
                  </OrderedList>
                ) : (
                  <Text>none</Text>
                )}
              </Flex>
              <Flex flexDir="column" mt="2rem">
                <Text
                  fontWeight="700"
                  fontSize={{ base: "17px", md: "1.5rem" }}
                  textDecor="underline"
                >
                  Education
                </Text>
                {tData.teacher?.fullEduDetails.length > 0 ? (
                  <OrderedList spacing="2rem">
                    {tData.teacher?.fullEduDetails?.map(
                      (item: any, i: number) => (
                        <Education
                          key={i}
                          edutype={item.eduType}
                          school={item.school}
                          city={item.city}
                          // certificate="https://res.cloudinary.com/bluebberies/image/upload/v1685046665/TutorialsPoint_CSS_1_pmwiwa.pdf"
                          certificate={item.certificate}
                          period={item.startDate + " - " + item.endDate}
                          handlePreviewCertificationModal={
                            handlePreviewCertificationModal
                          }
                          checkIfDocument={checkIfDocument}
                        />
                      )
                    )}
                  </OrderedList>
                ) : (
                  <Text>none</Text>
                )}
              </Flex>
              <Flex flexDir="column" mt="2rem">
                <Text
                  fontWeight="700"
                  fontSize={{ base: "17px", md: "1.5rem" }}
                  textDecor="underline"
                >
                  Other Certifications
                </Text>
                {tData.teacher?.otherCertifications.length > 0 ? (
                  <OrderedList spacing="2rem">
                    {tData.teacher?.otherCertifications?.map(
                      (item: any, i: number) => (
                        <OtherCertifications
                          key={i}
                          // certificate="https://res.cloudinary.com/bluebberies/image/upload/v1684218709/pg2q4plxrvlnqsqtqhwx.jpg"
                          certificate={item.certificate}
                          description={item.description || ""}
                          handlePreviewCertificationModal={
                            handlePreviewCertificationModal
                          }
                          checkIfDocument={checkIfDocument}
                        />
                      )
                    )}
                  </OrderedList>
                ) : (
                  <Text>none</Text>
                )}
              </Flex>
              <UnorderedLists
                name="Teachable Level(s)"
                data={tData.teacher?.teachableLevels?.map(
                  (item: any) => item.level
                )}
                // data={["primary", "tertiary"]}
              />
              <Flex justifyContent="flex-end" mt="2rem" gap="1rem">
                <Button
                  bg="#37254b"
                  color="white"
                  _hover={{ color: "white", opacity: ".7" }}
                  onClick={() =>
                    handleOpenModalDialogue(transformedId, "accept")
                  }
                >
                  Accept
                </Button>
                <Button
                  bg="red"
                  color="white"
                  _hover={{ color: "white", opacity: ".7" }}
                  onClick={() =>
                    handleOpenModalDialogue(transformedId, "reject")
                  }
                >
                  Reject
                </Button>
              </Flex>
            </Box>
          </>
        ) : (
          <Text>Unable to Fetch Details for Teacher</Text>
        )}
      </Box>
    </motion.div>
  );
};

export default ViewTeacher;

export async function getServerSideProps(context: any) {
  const { params, req, res } = context;
  const url = process.env.API_URL;
  const { id } = params;
  const { cookies } = req;
  const { refreshToken, accessToken } = cookies;
  if (isNaN(id)) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  try {
    const resp = await axios.get(
      `${url}/users/getTeacherApplicants?f=pending&teachId=${id}`,
      // { userId: id },
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
        tData: resp.data,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        tData: { falsy: true },
      },
    };
  }
}
