import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  Avatar,
} from "@chakra-ui/react";
import Link from "next/link";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/router";
import { logout } from "@/utils/logout";

const AdminNav = () => {
  const router = useRouter();
  
  return (
    <>
      <Link href="/admin">
        <Box pos="fixed" top="6" left={{ base: "10", md: "15" }} zIndex="50">
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
          <Avatar name="Super Admin" size="sm" src="" />
        </MenuButton>
        <MenuList>
          <MenuItem
            onClick={() => logout(router, "/admin/login")}
            icon={<FiLogOut color="red" />}
          >
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default AdminNav;
