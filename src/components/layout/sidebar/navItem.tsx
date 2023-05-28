import {
  Flex,
  Menu,
  MenuButton,
  Icon,
  Box,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import NavHoverBox from "./navHoverBox";
import { NavItemPropsTypes } from "../../../utils/interfaces/navItemPropTypes.interface";

const NavItem = ({
  title,
  userInfoAlign,
  sidebar,
  icon,
  menuName,
  mt,
  iconColor,
  showMenuItem,
  handleNavClick,
  menuItems,
  active,
  route,
  setShowSideBar,
  showSidebar,
  mobileSideBarActive,
}: NavItemPropsTypes) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const router = useRouter();

  const mouseEnterEvent = () => {
    setIsOpenMenu(true);
    setShowTooltip(true);
  };

  const mouseLeaveEvent = () => {
    setIsOpenMenu(false);
    setShowTooltip(false);
  };

  const handleSideNavClick = () => {
    setIsOpenMenu(false);
    setShowSideBar(!showSidebar);
    setShowTooltip(false);
    console.log(router);
    let bPath = router.asPath;
    if (route === "/password-reset" && bPath.includes("/password-reset")) {
      return null;
    } else if (route === "/" && bPath == "/dashboard/teacher") {
      return null;
    } else {
      router.push(`/dashboard/teacher${route}`);
    }
    // .catch((e) => {
    //   if (!e.cancelled) {
    //     throw e;
    //   }
    // });
  };

  function itemHoverStyle() {
    if (!active) {
      return {
        textDecor: "none",
        backgroundColor: "#82AAAD",
        color: "#fff",
      };
    }
  }

  return (
    <Flex flexDir="column" mt={mt} alignItems={userInfoAlign}>
      <Menu
        placement="right"
        gutter={sidebar === "large" ? 50 : 10}
        isOpen={isOpenMenu}
        id="1"
      >
        <Tooltip
          hasArrow
          label={menuName}
          bg="black"
          borderRadius="7px"
          placement="bottom"
          closeOnScroll
          isOpen={!showMenuItem && showTooltip}
        >
          <Box
            role="group"
            p={3}
            borderRadius="8"
            cursor="pointer"
            bg={active ? "#4a77d3" : "none"}
            _hover={itemHoverStyle()}
            w={sidebar === "large" ? "100%" : ""}
            onMouseEnter={mouseEnterEvent}
            onMouseLeave={mouseLeaveEvent}
            onClick={handleNavClick ?? handleSideNavClick}
          >
            <MenuButton>
              <Flex alignItems="center" dir="row">
                <Icon
                  as={icon}
                  color={"#fff"}
                  _groupHover={{ color: iconColor }}
                />
                <Text
                  ml={5}
                  display={sidebar === "small" ? "none" : "flex"}
                  color={"#fff"}
                  opacity={sidebar === "small" ? "0" : "1"}
                  transition={"opacity 5s ease"}
                  transitionDelay="5s"
                >
                  {menuName}
                </Text>
                {showMenuItem && (
                  <FaAngleRight color={active ? "#fff" : "black"} />
                )}
              </Flex>
            </MenuButton>
          </Box>
        </Tooltip>
        {showMenuItem && !mobileSideBarActive && (
          <NavHoverBox
            mouseEnterEvent={mouseEnterEvent}
            mouseLeaveEvent={mouseLeaveEvent}
            showMenuItem={showMenuItem}
            title={title}
            menuItems={menuItems}
          />
        )}
      </Menu>
    </Flex>
  );
};

export default NavItem;
