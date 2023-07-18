import {
  Box,
  Badge,
  Divider,
  Flex,
  Text,
  Button,
  UnorderedList,
  ListItem,
  Image,
  useDisclosure,
  OrderedList,
  useToast,
} from "@chakra-ui/react";
import { ColorRing } from "react-loader-spinner";
import { useState } from "react";
import { useRouter } from "next/router";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import OrderTeachModal from "@/components/teachFinderDashboard/order_teach_modal";
import BackButton from "@/components/layout/dashboardBackButton";
import axios from "axios";
import { setCookieToResponseHeader } from "@/utils/cookieHandler/setCookie";
import UnorderedLists from "@/components/admin/unorderedLists";
import UserDetails from "@/components/admin/userDetails";
import EmploymentItem from "@/components/admin/employmentLists";
import Education from "@/components/admin/educationLists";
import OtherCertifications from "@/components/admin/otherCertifications";
import DialogueModal from "@/components/admin/dialogueModal";
import ConfimationDialogue from "@/components/form/multistepForms/form1/confirmationDialog";
import { statusColorScheme } from "@/utils/helpers";

const GetTeacher = ({ tData }: { tData: any }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOrderConfirmedDialogueOpen,
    onOpen: onOrderConfirmedDialogueOpen,
    onClose: onOrderConfirmedDialogueClose,
  } = useDisclosure();
  const {
    isOpen: isPreviewCertiOpen,
    onOpen: openPreviewCertification,
    onClose: closePreviewCertification,
  } = useDisclosure();
  const [teacher, setTeacher] = useState({});
  const [ordering, setOrdering] = useState(false);
  const [ordered, setOrdered] = useState(checkIfOrdered() || false);
  const [dialogueModalMessage, setDialogueModalMessage] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const toast = useToast();

  const router = useRouter();
  const { id } = router.query;

  const handleTeachOrder = () => {
    onOpen();
  };

  const handlePreviewCertificationModal = (url: string) => {
    console.log("setFileUrl", url);
    if (checkIfDocument(url)) {
      window.open(url, "_blank");
    } else {
      setFileUrl(url);
      openPreviewCertification();
    }
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

  function checkIfOrdered (){
    if(tData){
      return tData?.orders?.some((obj: any) => {
        return obj?.finder === tData?.finder && obj?.teacher === tData?.teacher.id
      })
    }else{
      return false
    }
  }

  checkIfOrdered()

  const placeOrder = async() => {
    setOrdering(true)
    try {
      const { data } = await axios.post("/api/users/orderTeacher", {teachId: tData.teacher.id});
      setOrdering(false)
      setOrdered(true)
      onOrderConfirmedDialogueOpen();
      onClose();
    } catch (err: any) {
      setOrdering(false)
      toast({
        title:
          err?.response?.data?.message ||
          "Order not placed!, Please try again later.",
        status: "error",
        isClosable: true,
      });
      onClose();
    }
  };

  console.log("tData", tData);

  return (
    <motion.div
      key="teacher"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box minHeight="100vh" mx={{ base: "1rem", md: "3rem" }} my="3rem">
        <BackButton />
        <ConfimationDialogue
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          handleSubmit={placeOrder}
          order={true}
          isSending={ordering}
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
              <OrderTeachModal
                onClose={onOrderConfirmedDialogueClose}
                isOpen={isOrderConfirmedDialogueOpen}
              />
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
                    colorScheme={statusColorScheme(
                      tData.teacher.availabilityStatus
                    )}
                    display="flex"
                    height="25px"
                    rounded="lg"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {tData.teacher.availabilityStatus}
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
                  <Text fontWeight="700">City:</Text>
                  {tData.teacher?.availabilityLocation[0].city}
                </Box>
                <Box display="flex" gap=".5rem" alignItems="center">
                  <Text fontWeight="700">State:</Text>
                  {tData.teacher?.availabilityLocation[0].state}
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
              <Flex justifyContent="flex-end" mt="2rem">
                <Button
                  bg="#37254b"
                  color="white"
                  isDisabled={ordering || ordered}
                  _hover={{ color: "white" }}
                  onClick={handleTeachOrder}
                >
                  {ordered ? (
                    <>
                      <CheckCircleIcon /> <Text ml="5px">Ordered</Text>
                    </>
                  ) : (
                    "Order Teacher"
                  )}
                  {ordering && <ColorRing width={30} height={30} />}
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

export default GetTeacher;

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
      `${url}/users/getTeacherApplicants?f=available&u=teacher_finder&teachId=${id}`,
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
