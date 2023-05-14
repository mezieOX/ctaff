import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  SimpleGrid,
  Text,
  Divider
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import Link from "next/link";
import NotificationModal from './notificationModal'

interface NotificationsInterface {
  isOpen: boolean;
  onClose: any;
}

const Notifications = ({ isOpen, onClose }: NotificationsInterface) => {

  const [openModal, setOpenModal] = useState(false)
  const [modalMessage, setModalMessage] = useState("")

  const cutText = (text: string) => {
    return text.slice(0, 50)
  }

  const  handleCloseModal = () => {
    setOpenModal(false)
  }

  const [arr, setArr] = useState([
    {notif: 'You have been Invited You have been Invitedv vYou have been invited', viewed: false},
    {notif: 'You have been Invited You have been Invitedv vYou have been invited', viewed: false},
    {notif: 'You have been Invited You have been Invitedv vYou have been invited', viewed: false},
    {notif: 'You have been Invited You have been Invitedv vYou have been invited', viewed: false},
    {notif: 'You have been Invited You have been Invitedv vYou have been invited', viewed: false},
    {notif: 'You have been Invited You have been Invitedv vYou have been invited', viewed: false},
    {notif: 'You have been Invited You have been Invitedv vYou have been invited', viewed: false},
    {notif: 'You have been Invited You have been Invitedv vYou have been invited', viewed: false},
    {notif: 'You have been Invited You have been Invitedv vYou have been invited', viewed: false},
    {notif: 'You have been Invited You have been Invitedv vYou have been invited', viewed: false},
    {notif: 'You have been Invited You have been Invitedv vYou have been invited', viewed: false},
  ])


  const handleNotificationClick = (index: number) => {
    setModalMessage(arr[index].notif)
    setOpenModal(true)
    let newArr = arr.filter((item, i) => i === index? item.viewed = true: item)

    setArr(newArr)
    // console.log(newArr)
  }
  return (
    <>
      <NotificationModal
        message={modalMessage}
        isOpen={openModal}
        onClose={handleCloseModal}
      />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Notifications</DrawerHeader>

          <DrawerBody>
            <SimpleGrid spacing="10px">
              {/* <Link href="/">
                <Box
                  bg="gray.400"
                  _hover={{ bg: "gray.500" }}
                  color="white"
                  width="100%"
                  py="1rem"
                  px="1rem"
                  rounded="md"
                >
                  <Text>
                    {cutText('You have been Invited You have been Invitedv vYou have been invited')}...
                  </Text>
                </Box>
              </Link>
              <Divider mt="0" borderWidth="1px" borderColor="gray"/> */}
              {arr.map((item, i) => (
                <Box key={i}>
                  {/* <Link href="/"> */}
                  <Box
                  as="div"
                    onClick={() => handleNotificationClick(i)}
                    bg={item.viewed ? "gray.100" : "gray.400"}
                    _hover={{ bg: item.viewed ? "gray.100" : "gray.500" }}
                    color={item.viewed ? "black" : "white"}
                    width="100%"
                    py="1rem"
                    px="1rem"
                    rounded="md"
                    // sx={}
                    cursor="pointer"
                  >
                    <Text>
                      {cutText(
                        "You have been Invited You have been Invitedv vYou have been invited"
                      )}
                      ...
                    </Text>
                  </Box>
                  {/* </Link> */}
                  <Divider mt="1rem" borderWidth="1px" borderColor="gray" />
                </Box>
              ))}
            </SimpleGrid>
          </DrawerBody>

          {/* <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Submit</Button>
          </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Notifications;
