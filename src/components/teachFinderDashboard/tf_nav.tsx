
import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Image,
    Avatar,
} from "@chakra-ui/react";
import Link from "next/link";
import { FiLogOut, FiUser } from "react-icons/fi";
 
const TeachFinderNav = () => {
    return ( <>
      <Link href="/dashboard/teacher_finder">
            <Box pos="absolute" top="-12" left={{ base: "10", md: "20" }}>
              <Image
                src="/images/iykelnHub.png"
                width={39}
                height={37}
                alt="homeimg"
              />
            </Box>
          </Link>

          <Menu>
            <MenuButton
              pos="fixed"
              top="6"
              right="15"
              zIndex="50"
              _hover={{ bg: "none" }}
              aria-label="open menu"
              bg="#37254b"
              rounded="full"
              borderRadius="50%"
            >
              <Avatar name="Tinubu Agbado" size="sm" src="none.jpg" />
            </MenuButton>
            <MenuList>
              <MenuItem icon={<FiUser color="purple"/>}>Profile</MenuItem>
              <MenuDivider />
              <MenuItem icon={<FiLogOut color="red"/>}>Logout</MenuItem>
            </MenuList>
            </Menu>
    </> );
}
 
export default TeachFinderNav;