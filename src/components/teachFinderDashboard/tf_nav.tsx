
import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Image,
  Avatar,
} from "@chakra-ui/react";
import { FiLogOut, FiUser } from "react-icons/fi";
import { logout } from "@/utils/logout";
import { useRouter } from "next/router"
import { goToDashBoardHome } from "@/utils/helpers";
 
const TeachFinderNav = ({tfData}: {tfData: any}) => {
    const router = useRouter();

    return (
      <>
        <Box 
          pos="absolute" 
          top="-12"
          left={{ base: "10", md: "20" }}
          cursor="pointer"
          onClick={() => goToDashBoardHome(router, "teacher_finder")}
        >
          <Image
            src="/images/iykelnHub.png"
            width={39}
            height={37}
            alt="homeimg"
          />
        </Box>
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
            <Avatar
              name={
                tfData?.firstname? `${tfData.firstname} ${tfData.lastname}`:
                "Teacher Finder"
              }
              size="sm"
              src=""
            />
          </MenuButton>
          <MenuList>
            <MenuItem icon={<FiUser color="purple" />}>Profile</MenuItem>
            <MenuDivider />
          <MenuItem
            onClick={() => logout(router, "/login")}
            icon={<FiLogOut color="red" />}
          >
            Logout
          </MenuItem>

          </MenuList>
        </Menu>
      </>
    );
}
 
export default TeachFinderNav;