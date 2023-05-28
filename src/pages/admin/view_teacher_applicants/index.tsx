import {
  Box,
  Heading,
  SimpleGrid,
  Flex,
  Text,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import AdminNav from "@/components/admin/nav";
import {formatSubjects} from "@/utils/helpers"
import BackButton from "@/components/layout/dashboardBackButton"
import {useRouter} from "next/router"
import DialogueModal from "@/components/admin/dialogueModal"

const ViewTeacherApplicants = () => {

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [dialogueModalMessage, setDialogueModalMessage] = useState("")
  const [action, setAction] = useState({type: "", teacher_id: 0})
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSending, setIsSending] = useState(false)


  const router = useRouter()

const handleActivate = (index: number) => {
    setHoveredIndex(index)
  };
  
  const handleDeactivate = () => {
    setHoveredIndex(null)
  };

    let fakeTeacherData = [
    {id: 1, firstname: "Frank", lastname:"lungaga", subjects:["biology", "agric", "grete"], city: "Lagos", state: "Nigeria"},
    {id: 2, firstname: "Frank", lastname:"lungaga", subjects:["biology", "agric", "grete"], city: "Lagos", state: "Nigeria"},
    {id: 3, firstname: "Frank", lastname:"lungaga", subjects:["biology", "agric", "grete"], city: "Lagos", state: "Nigeria"},
    {id: 4, firstname: "Frank", lastname:"lungaga", subjects:["biology", "agric", "grete"], city: "Lagos", state: "Nigeria"},
  ]

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
          <SimpleGrid columns={{base: 1, md: 2, lg: 3, xl: 4}} spacing="2rem">
            {fakeTeacherData.map((data, index) => (
              <Flex
                key={index}
                bg="#fff"
                w="20rem"
                minHeight="10rem"
                height="auto"
                color="#000"
                flexDir="row"
                _hover={{
                  shadow: "1px 1px 11px 12px rgba(1,1,1,0.1)",
                }}
                shadow="1px 3px 16px 4px rgba(1,1,1,0.1);"
                rounded="lg"
                overflow="hidden"
                position="relative"
                // onTouchStart={() => handleActivate(index)}
                // onTouchEnd={handleDeactivate}
                onMouseEnter={() => handleActivate(index)}
                onMouseLeave={handleDeactivate}
              >
                <Box objectFit="center" w="50%">
                  <Image
                    width="100%"
                    height="100%"
                    alt="teacher"
                    src="https://res.cloudinary.com/bluebberies/image/upload/v1684218709/pg2q4plxrvlnqsqtqhwx.jpg"
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
                    {data.firstname} {data.lastname}
                    {/* Francis Okonkwo */}
                  </Text>
                  <Text fontWeight={300}>
                    {formatSubjects(data.subjects)} Teacher
                    {/* English Teacher */}
                  </Text>
                  <Text fontWeight={500}>
                    {data.city}, {data.state}
                    {/* Lagos, anambra */}
                  </Text>
                </Flex>
                
                { hoveredIndex === index && (
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
                    <Flex direction="row" alignItems="center" gap="3rem"  color="#fff">
                      <Text onClick={() => teacherDetails(data.id)} cursor="pointer" _hover={{bg:"blue"}} transition=".2s" py="5px" px="8px" rounded="lg" border="2px solid blue">View</Text>
                      <Text onClick={() => handleOpenModalDialogue(data.id, "accept")} cursor="pointer" _hover={{bg:"green"}} transition=".2s" py="5px" px="8px" rounded="lg" border="2px solid green">Accept</Text>
                      <Text onClick={() => handleOpenModalDialogue(data.id, "reject")} cursor="pointer" _hover={{bg:"red"}} transition=".2s" py="5px" px="8px" rounded="lg" border="2px solid red">Reject</Text>
                    </Flex>
                  </Box>
                )}
              </Flex>
            ))}
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
};

export default ViewTeacherApplicants;