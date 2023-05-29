import {
  Avatar,
  Divider,
  Flex,
  Heading,
  IconButton,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import {useRouter} from "next/router";
import { FiHome, FiLogOut } from "react-icons/fi";
import { MdQuiz } from "react-icons/md";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { BsCardList, BsKeyFill } from "react-icons/bs";
import { useState } from "react";
import NavItem from "./navItem";
// import courses

interface SideBarProps {
  showSidebar: boolean;
  sidebar: string;
  setSideBar: Function;
  setShowSideBar: Function,
  mobileSideBarActive: Boolean
}

const SideBar = ({ showSidebar, sidebar, setSideBar, setShowSideBar, mobileSideBarActive }: SideBarProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const router = useRouter();

  const mouseEnterEvent = () => {
    setShowTooltip(true);
  };

  const mouseLeaveEvent = () => {
    setShowTooltip(false);
  };


  const handleSideBarIconClick = () => {
    if (sidebar === "small") setSideBar("large");
    else setSideBar("small");
  };

  const sidebarWidth = sidebar === "small" ? "75px" : "200px";
  const sideBarDisplay = sidebar === "small" ? "none" : "flex";
  const userInfoAlign = sidebar === "small" ? "center" : "flex-start";

  const handleLogout = () => {
    console.log("Logout");
  };

console.log(router)

  function goToProfile() {
    if(!router.pathname.includes("/profile")) {
      router.push("/dashboard/teacher/profile");
    }

  }

  return (
    <Flex
      pos="fixed"
      left="0"
      top="0"
      bottom="0"
      h="100%"
      zIndex="5"
      backgroundColor="#37254b"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      w={{ base: showSidebar ? "100%" : "0px", sm: sidebarWidth }}
      flexDir="column"
      justifyContent="space-between"
      transition={"width .5s ease"}
    >
      <Flex
        pos="relative"
        p="5%"
        display={{ base: showSidebar ? "flex" : "none", sm: "flex" }}
        flexDir="column"
        alignItems="flex-start"
        as="nav"
      >
        <IconButton
          display={{ base: "none", sm: "flex" }}
          background="black"
          pos="absolute"
          right="-5"
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
          icon={sidebar === "small" ? <FaAngleRight /> : <FaAngleLeft />}
          onClick={handleSideBarIconClick}
        />
        <Flex mt="10" w="100%" flexDir="column">
          <NavItem
            userInfoAlign={userInfoAlign}
            sidebar={sidebar}
            icon={FiHome}
            menuName="Dashboard"
            mt="8"
            iconColor="#fff"
            title="Dashboard"
            route="/"
            active={router.pathname.endsWith("teacher")}
            setShowSideBar={setShowSideBar}
            showSidebar={showSidebar}
          />
          <NavItem
            userInfoAlign={userInfoAlign}
            sidebar={sidebar}
            icon={BsKeyFill}
            menuName="Password Reset"
            mt="8"
            iconColor="#fff"
            title="Password"
            route='/password-reset'
            active={router.pathname.includes("password")}
            setShowSideBar={setShowSideBar}
            showSidebar={showSidebar}
          />
          <NavItem
            userInfoAlign={userInfoAlign}
            setShowSideBar={setShowSideBar}
            sidebar={sidebar}
            icon={FiLogOut}
            menuName="Logout"
            mt="8"
            iconColor="red"
            handleNavClick={handleLogout}
            title="Logout"
          />
        </Flex>
      </Flex>
      <Flex
        p="5%"
        display={{ base: showSidebar ? "flex" : "none", sm: "flex" }}
        flexDir="column"
        w="100%"
        mb="4"
        alignItems={userInfoAlign}
      >
        <Divider
          // display={sideBarDisplay}
          width={sidebar === "small" ? "0" : "100%"}
          transition={"all .4s ease"}
        />
        <Tooltip
          hasArrow
          label={"Profile"}
          bg="black"
          borderRadius="7px"
          placement="bottom"
          closeOnScroll

          // isOpen={!showMenuItem && showTooltip}
        >
          <Flex
            mt="4"
            align="center"
            gap="3px"
            cursor="pointer"
            onClick={goToProfile}
            onMouseEnter={mouseEnterEvent}
            onMouseLeave={mouseLeaveEvent}
          >
            <Avatar name="Tinubu Agbado" size="sm" src="none.jpg" />
            <Flex
              flexDir="column"
              // display={sideBarDisplay}
              width={sidebar === "small" ? "0" : "100%"}
              height={sidebar === "small" ? "0" : "100%"}
              opacity={sidebar === "small" ? "0" : "1"}
              transition={"opacity .4s ease"}
            >
              <Heading as="h3" size="sm" color="#fff">
                Tinubu Agbado
              </Heading>
              <Text color="white">Teacher</Text>
            </Flex>
          </Flex>
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default SideBar;
