import { NextPage } from "next";
import Head from "next/head";
import Router from "next/router";
import { useEffect, useState } from "react";
import {
  CircularProgress,
  Flex,
  IconButton,
  Text,
  useDisclosure,
  Avatar,
  AvatarBadge,
} from "@chakra-ui/react";
import { FaBell } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { css } from "@emotion/react";
import { siteTitle } from "./../../config/siteTitle";
import SideBar from './../layout/sidebar/index';
import Notifications from './notifications';
import DashBoardHome from './dashboardHome';

const DashBoardLayout: NextPage = ({children, pageTitle}: {children?: any, pageTitle: string}) => {
  const [sidebar, setSideBar] = useState("large");
  const [showSidebar, setShowSideBar] = useState(false);
  const [mobileSideBarActive, setMobileSideBarActive] = useState(false);
  const [path, setPath] = useState("");
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const title = `${siteTitle} - ${pageTitle}`;

  const handleHamburgerClick = () => {
    setShowSideBar(!showSidebar);
    setMobileSideBarActive(true);
  };

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Notifications isOpen={isOpen} onClose={onClose} />

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
                  <AvatarBadge boxSize="1.25em" bg="red.500">
                    <Text fontSize="12px">9+</Text>
                  </AvatarBadge>
                </Avatar>
              </>
            }
          />
          {children}
        </Flex>
      </Flex>
    </>
  );
};

export default DashBoardLayout;
