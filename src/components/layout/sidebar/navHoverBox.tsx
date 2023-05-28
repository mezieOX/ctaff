import NextLink from "next/link";
import { MenuGroup, MenuItem, MenuList } from "@chakra-ui/react";
import { NavHoverBoxPropTypes } from "../../../utils/interfaces/navItemPropTypes.interface";

const NavHoverBox = ({
  mouseEnterEvent,
  mouseLeaveEvent,
  showMenuItem,
  title,
  menuItems,
}: NavHoverBoxPropTypes) => {
  return (
    <>
      <MenuList
        w="3px"
        bg="gray"
        onMouseEnter={mouseEnterEvent}
        onMouseLeave={mouseLeaveEvent}
      >
        <MenuGroup
          color="#fff"
          title={title}
          textDecoration={showMenuItem ? "underline" : "none"}
        >
          {menuItems?.length ? (
            menuItems.map((item, index) => (
              <MenuItem
                key={index}
                bg="gray"
                as={NextLink}
                href={item.href}
                color="#fff"
                // w='10px'
                closeOnSelect={true}
                onClick={mouseLeaveEvent}
                _hover={{ bg: "#fff", color: "black" }}
              >
                {item.course}
              </MenuItem>
            ))
          ) : (
            <MenuItem
              color="#fff"
              bg="gray"
              _hover={{ bg: "none" }}
              cursor="not-allowed"
            >
              ...
            </MenuItem>
          )}
        </MenuGroup>
      </MenuList>
    </>
  );
};

export default NavHoverBox;
