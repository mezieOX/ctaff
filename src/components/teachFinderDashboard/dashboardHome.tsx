import {
  Box,  
  Heading,
  useDisclosure,
  CircularProgressLabel,
  Text,
  Avatar,
  AvatarBadge,
  AlertTitle,
  IconButton,  
  AlertDescription,
   Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
// import { FiUser } from "react-icons/fi";
import TeachFinderNav from "./tf_nav"
import { FiLogOut, FiUser } from "react-icons/fi";
import {FaBell} from 'react-icons/fa'
import { useEffect, useState } from "react";
import Link from "next/link"
import Image from "next/image";
import Notifications from "@/components/teacherDashboard/notifications"
import {getDayTime} from "@/utils/helpers"
import {cutText} from "@/utils/helpers"
// import Notifivc

const DashBoardHome = () => {

  const [greeting, setGreeting] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const router = useRouter()


  useEffect(() => {
    getDayTime(setGreeting)
  }, []);

  const [arr, setArr] = useState([
    {notif: 'You have been Invited You have been Invitedv vYou have been invited', viewed: false},
    {notif: 'You have been Invited You have been Invitedv vYou have been invited', viewed: false},
    {notif: 'You have been Invited You have been Invitedv vYou have been invited', viewed: false},
    {notif: 'You have been Invited You have been Invitedv vYou have been invited', viewed: false},
  ])

  const [openModal, setOpenModal] = useState(false)
  const [modalMessage, setModalMessage] = useState("")

  const  handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleNotificationClick = (index: number) => {
    setModalMessage(arr[index].notif)
    setOpenModal(true)
    let newArr = arr.filter((item, i) => i === index? item.viewed = true: item)

    setArr(newArr)
    // console.log(newArr)
  }

  const go_to_teacher_finder = () => {
    router.push('/dashboard/teacher_finder/find_teacher')
  }


  return (
    <Box minHeight="100vh" position="relative">
      <Box mx="2rem" my="5rem">
        <Notifications
          isOpen={isOpen}
          onClose={onClose}
          arr={arr}
          modalMessage={modalMessage}
          openModal={openModal}
          handleCloseModal={handleCloseModal}
          handleNotificationClick={handleNotificationClick}
          cutText={cutText}
        />
        <Box>

          <IconButton
            size="lg"
            pos="fixed"
            top="4"
            right="20"
            zIndex="4"
            _hover={{ bg: "none" }}
            aria-label="open menu"
            bg="#37254b"
            // rounded="5xl"
            borderRadius="50%"
            icon={
              <>
                <Avatar bg="#37254b" onClick={onOpen} icon={<FaBell />}>
                  <AvatarBadge boxSize="1.25em" bg="red.500">
                    <Text fontSize="12px">9+</Text>
                  </AvatarBadge>
                </Avatar>
              </>
            }
          />
          <TeachFinderNav/>
        </Box>
        <Heading fontSize={{ base: "2rem", md: "3rem" }}>
          {greeting}, Mr. Tinubu!
        </Heading>
        <Text as="h3" fontWeight={700}>
          How can we help you today?
        </Text>
          <Box
            onClick={go_to_teacher_finder}
            cursor="pointer"
            mt="3rem"
            display="flex"
            alignItems="center"
            justifyContent="center"
            rounded="lg"
            width={{ base: "100%", md: "40%", lg: "30%", xl: "25%" }}
            height="17rem"
            // maxWidth="30%"
            fontWeight="500"
            fontSize={{ base: "1rem", md: "1.5rem" }}
            px="10px"
            transition=".3s"
            _hover={{
              bg: "#a08db5",
              color: "white",
            }}
            shadow="1px 3px 16px 4px rgba(1,1,1,0.1);"
          >

              Find a teacher in your area
          </Box>
      </Box>
      <Box position="absolute" bottom="0" left="0" right="0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#37254b"
            fill-opacity="1"
            d="M0,192L48,208C96,224,192,256,288,234.7C384,213,480,139,576,117.3C672,96,768,128,864,160C960,192,1056,224,1152,202.7C1248,181,1344,107,1392,69.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </Box>
    </Box>
  );
};

export default DashBoardHome;

