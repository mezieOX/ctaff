import {
  Box,
  useDisclosure,
  Text,
  Avatar,
  AvatarBadge,
  IconButton,
} from "@chakra-ui/react";
import Head from "next/head";
import TeachFinderNav from "./tf_nav";
import { FaBell } from "react-icons/fa";
import { useEffect, useState } from "react";
import { siteTitle } from "./../../config/siteTitle";
import Notifications from "@/components/teacherDashboard/notifications";
import { cutText } from "@/utils/helpers";

const TeacherFinderDashBoardLayout = ({
  children,
  pageTitle,
  tfData,
}: {
  children?: any;
  pageTitle: string;
  tfData: any;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [notifications, setNotifications] = useState(tfData.notifications);
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleNotificationClick = (index: number) => {
    setModalMessage(notifications[index].message);
    setOpenModal(true);
    let newNotif = notifications.filter((item: any, i: number) =>
      i === index ? (item.isViewed = true) : item
    );
  };
  
  const title = `${siteTitle} - ${pageTitle}`;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Box>
        <Notifications
          isOpen={isOpen}
          onClose={onClose}
          notifications={notifications}
          modalMessage={modalMessage}
          openModal={openModal}
          handleCloseModal={handleCloseModal}
          handleNotificationClick={handleNotificationClick}
          cutText={cutText}
        />
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
              <Avatar
                bg="#37254b"
                mixBlendMode="difference"
                onClick={onOpen}
                icon={<FaBell />}
              >
                {tfData?.notifications?.filter((item: any) => !item.isViewed)
                  ?.length > 0 && (
                  <AvatarBadge boxSize="1.25em" bg="red.500">
                    <Text fontSize="12px">
                      {tfData?.notifications?.filter(
                        (item: any) => !item.isViewed
                      ).length > 9
                        ? "9j+"
                        : tfData?.notifications?.filter(
                            (item: any) => !item.isViewed
                          ).length}{" "}
                    </Text>
                  </AvatarBadge>
                )}
              </Avatar>
            </>
          }
        />
        <TeachFinderNav tfData={tfData} />
        {children}
      </Box>
    </>
  );
};

export default TeacherFinderDashBoardLayout;
