import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  Text,
  useDisclosure,
  Avatar,
  AvatarBadge,
} from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { FaBell } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { css } from "@emotion/react";
import { siteTitle } from "./../../config/siteTitle";
import SideBar from "./../layout/sidebar/index";
import Notifications from "./notifications";
import { cutText } from "@/utils/helpers";
import { goToDashBoardHome } from "@/utils/helpers";

const DashBoardLayout = ({
  children,
  pageTitle,
  teacherData,
}: {
  children?: any;
  pageTitle: string;
  teacherData: any;
}) => {
  const [sidebar, setSideBar] = useState("large");
  const [showSidebar, setShowSideBar] = useState(false);
  const [mobileSideBarActive, setMobileSideBarActive] = useState(false);
  const [path, setPath] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const title = `${siteTitle} - ${pageTitle}`;

  const handleHamburgerClick = () => {
    setShowSideBar(!showSidebar);
    setMobileSideBarActive(true);
  };

  const [notifications, setNotifications] = useState(teacherData.notifications);
  //   {
  //   message:
  //     "You have been Invited You have been Invitedv vYou have been invited",
  //   viewed: false,
  // },

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

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
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

      <Flex>
        <IconButton
          display={{ base: "flex", sm: "none" }}
          background="black"
          pos="fixed"
          right="5"
          zIndex="10"
          borderRadius="16px"
          aria-label="sidebar-Toggle"
          color="#fff"
          mt="5"
          _hover={{
            background: "black",
            color: "white",
          }}
          _active={{
            background: "white",
            color: "black",
          }}
          icon={<FiMenu />}
          onClick={handleHamburgerClick}
        />

        <SideBar
          sidebar={sidebar}
          showSidebar={showSidebar}
          setSideBar={setSideBar}
          setShowSideBar={setShowSideBar}
          mobileSideBarActive={mobileSideBarActive}
          teacherData={teacherData}
        />

        <Flex
          ml={{ base: "30px", sm: sidebar === "large" ? "250px" : "150px" }}
          mt="12"
          flexDir="column"
          gap="10px"
          transition={"margin-left .6s ease"}
          minHeight="container.md"
          w="80%"
          mb={10}
        >
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
                  {teacherData?.notifications?.filter(
                    (item: any) => !item.isViewed
                  )?.length > 0 && (
                    <AvatarBadge boxSize="1.25em" bg="red.500">
                      <Text fontSize="12px">
                        {teacherData?.notifications?.filter(
                          (item: any) => !item.isViewed
                        ).length > 9
                          ? "9j+"
                          : teacherData?.notifications?.filter(
                              (item: any) => !item.isViewed
                            ).length}{" "}
                      </Text>
                    </AvatarBadge>
                  )}
                </Avatar>
              </>
            }
          />
          <Box
            pos="absolute"
            top="30"
            left={{ base: "10", sm: sidebar === "large" ? "60" : "40" }}
            transition={"left .6s ease"}
            onClick={() => goToDashBoardHome(router, "teacher")}
            cursor="pointer"
            // left={{ base: "10", md: "60" }}
          >
            <Image
              src="/images/iykelnHub.png"
              width={40}
              height={45}
              alt="homeimg"
            />
          </Box>

          {children}
        </Flex>
      </Flex>
    </>
  );
};

export default DashBoardLayout;
