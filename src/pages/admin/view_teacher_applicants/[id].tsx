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
  OrderedList
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import BackButton from "@/components/layout/dashboardBackButton";
import DialogueModal from "@/components/admin/dialogueModal"
import UserDetails from "@/components/admin/userDetails"
import PreviewCertificationModal from "@/components/admin/previewCertificationModal"
import EmploymentItem from "@/components/admin/employmentLists"
import UnorderedLists from "@/components/admin/unorderedLists"
import Education from "@/components/admin/educationLists"
import OtherCertifications from "@/components/admin/otherCertifications"

const ViewTeacher = () => {
  const [teacher, setTeacher] = useState({});
  const [dialogueModalMessage, setDialogueModalMessage] = useState("")
  const [action, setAction] = useState({type: "", teacher_id: 0})
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isPreviewCertiOpen, onOpen: openPreviewCertification, onClose: closePreviewCertification } = useDisclosure();
  const [isSending, setIsSending] = useState(false)
  const [fileUrl, setFileUrl] = useState("")

  const router = useRouter();
  // const { id } = router.query;
  // let transformedId = +router?.query?.id || 0
  let transformedId: number;

  if(router?.query?.id && +router?.query?.id)
    transformedId = +router?.query?.id
  else 
    transformedId = 0
  
  const handleDialogueModalMessage = (e: any) => {
    setDialogueModalMessage(e.target.value)
  }

  const handleDialogueMessageSend = () => {
    if(action.type === "accept"){
      // setIsSending(true)
      console.log(action.type + "ing" + " good " + action.teacher_id )
      alert(dialogueModalMessage)
    }else{
      console.log(action.type + "ing" + " bad " + action.teacher_id )
    }
  }

  const teacherDetails = (id: any) => {
    router.push(`/admin/view_teacher_applicants/${id}`)
  }

  const handleOpenModalDialogue = (teacher_id: number, type: string) => {
    setAction({type, teacher_id})
    onOpen()
  }

  const checkIfDocument =  (url: string) =>{
    const fileExtension = url?.split('.').pop()?.toLowerCase();
    const supportedDocumentFormats = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'];
    // openPreviewCertification()
    return fileExtension && supportedDocumentFormats.includes(fileExtension)

  }

  const handlePreviewCertificationModal = (url: string) => {
    if (checkIfDocument(url)) {
      window.open(url, "_blank");
    } else {
      setFileUrl(url);
      openPreviewCertification();
    }
  }
  

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
              src="https://res.cloudinary.com/bluebberies/image/upload/v1684218709/pg2q4plxrvlnqsqtqhwx.jpg"
              alt="teacher"
            />
          </Box>
          <Flex
            w={{ base: "100%", md: "70%", lg: "50%" }}
            flexDir="column"
            gap=".5rem"
          >
            <UserDetails title="Firstname" value="Francis"/>
            <UserDetails title="Lastname" value="Okonkwo"/>
            <UserDetails title="Gender" value="Male"/>
            <UserDetails title="Phone" value="0280380838"/>
            <UserDetails title="Email" value="frank@gmal.com"/>
            <UserDetails title="City" value="Lagos"/>
            <UserDetails title="State of origin" value="Anambra"/>
            <UserDetails title="Nationality" value="Nigeria"/>
            <UserDetails title="Level of Education" value="Graduate"/>
            <Box
              display="flex"
              gap="1rem"
              fontSize={{ md: "17px", xl: "1.5rem" }}
              alignItems="center"
            >
              <Text fontWeight="500">Status:</Text>
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
            <UserDetails title="Highest Degree Obtained" value="Bsc."/>
            <UserDetails title="Years of teaching experience" value="6 - 12 months"/>
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
              onClick={() => handlePreviewCertificationModal("https://res.cloudinary.com/bluebberies/image/upload/v1684218709/pg2q4plxrvlnqsqtqhwx.jpg")}
            >
              {!checkIfDocument("https://res.cloudinary.com/bluebberies/image/upload/v1685046665/TutorialsPoint_CSS_1_pmwiwa.pdf")? <Image
                width="100%"
                height="100%"
                src="https://res.cloudinary.com/bluebberies/image/upload/v1684218709/pg2q4plxrvlnqsqtqhwx.jpg"
                alt="teacher"
              />: 
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
              }
            </Box>

          </Flex>
          <Flex flexDir="column" mt="2rem">
            <Text
              fontWeight="700"
              fontSize={{ base: "17px", md: "1.5rem" }}
              textDecor="underline"
            >
              Skill(s)
            </Text>
            <UnorderedList>
              <ListItem>Playing - 70%</ListItem>
              <ListItem>Dancing -  90%</ListItem>
            </UnorderedList>
          </Flex>
          <Flex flexDir="column" mt="2rem">
            <Text
              fontWeight="700"
              fontSize={{ base: "17px", md: "1.5rem" }}
              textDecor="underline"
            >
              Language(s)
            </Text>
            <UnorderedList>
              <ListItem>English - 70%</ListItem>
              <ListItem>Igbo - 40%</ListItem>
            </UnorderedList>
          </Flex>
          <Flex flexDir="column">
            <Text
              fontWeight="700"
              fontSize={{ base: "17px", md: "1.5rem" }}
              textDecor="underline"
            >
              Availability Days
            </Text>
            <UnorderedList>
              <ListItem>Lorem ipsum dolor sit amet</ListItem>
              <ListItem>Consectetur adipiscing elit</ListItem>
              <ListItem>Integer molestie lorem at massa</ListItem>
              <ListItem>Facilisis in pretium nisl aliquet</ListItem>
            </UnorderedList>
          </Flex>
          <Flex flexDir="column" mt="2rem">
            <Text
              fontWeight="700"
              fontSize={{ base: "17px", md: "1.5rem" }}
              textDecor="underline"
            >
              Availability Location
            </Text>
            <Box display="flex" gap=".5rem" alignItems="center">
              <Text fontWeight="700">City:</Text>Surulere
            </Box>
            <Box display="flex" gap=".5rem" alignItems="center">
              <Text fontWeight="700">State:</Text>Lagos
            </Box>
          </Flex>
          <UnorderedLists name="Teachable Subject(s)" data={["maths", 'english']}/> 
          <Flex flexDir="column" mt="2rem">
            <Text
              fontWeight="700"
              fontSize={{ base: "17px", md: "1.5rem" }}
              textDecor="underline"
            >
              Employment Details
            </Text>
            <OrderedList spacing="2rem">
              <EmploymentItem
                jobTitle="Clerk"
                employers="Toppan"
                city="Lagos"
                description="hdk enk enknknknkdenselna bnje jeb bqrjijive werbieq qif"
                period="12/3/2021 - 2/4/2023"
              />
            </OrderedList>
          </Flex>
          <Flex flexDir="column" mt="2rem">
            <Text
              fontWeight="700"
              fontSize={{ base: "17px", md: "1.5rem" }}
              textDecor="underline"
            >
              Education
            </Text>
            <OrderedList spacing="2rem">
              <Education
                edutype="tertiary"
                school="Esteem"
                city="Lagos" 
                certificate="https://res.cloudinary.com/bluebberies/image/upload/v1685046665/TutorialsPoint_CSS_1_pmwiwa.pdf" 
                period="12/3/2021 - 2/4/2023" 
                handlePreviewCertificationModal={handlePreviewCertificationModal} 
                checkIfDocument={checkIfDocument}
              />
            </OrderedList>
          </Flex>
          <Flex flexDir="column" mt="2rem">
            <Text
              fontWeight="700"
              fontSize={{ base: "17px", md: "1.5rem" }}
              textDecor="underline"
            >
              Other Certifications
            </Text>
            <OrderedList spacing="2rem">
              <OtherCertifications
                certificate="https://res.cloudinary.com/bluebberies/image/upload/v1684218709/pg2q4plxrvlnqsqtqhwx.jpg" 
                handlePreviewCertificationModal={handlePreviewCertificationModal} 
                checkIfDocument={checkIfDocument}
              />
              <OtherCertifications
                certificate="https://res.cloudinary.com/bluebberies/image/upload/v1685046665/TutorialsPoint_CSS_1_pmwiwa.pdf" 
                description=" i love God"
                handlePreviewCertificationModal={handlePreviewCertificationModal} 
                checkIfDocument={checkIfDocument}
              />
            </OrderedList>
          </Flex>
          <UnorderedLists name="Teachable Level(s)" data={["primary", 'tertiary']}/> 
          <Flex justifyContent="flex-end" mt="2rem" gap="1rem">
            <Button
              bg="#37254b"
              color="white"
              _hover={{ color: "white", opacity: ".7" }}
              onClick={() => handleOpenModalDialogue(transformedId, "accept")}
            >
              Accept
            </Button>
            <Button
              bg="red"
              color="white"
              _hover={{ color: "white", opacity: ".7" }}
              onClick={() => handleOpenModalDialogue(transformedId, "reject")}
            >
              Reject
            </Button>
          </Flex>
        </Box>
      </Box>
    </motion.div>
  );
};

export default ViewTeacher;
