import {
  Box,
  Text,
} from "@chakra-ui/react";

interface UserDetailsInterface {
    title: string;
    value: string;
}

const UserDetails = ({title, value}: UserDetailsInterface) => {
    return (
          <Box
              display="flex"
              gap="1rem"
              fontSize={{ md: "17px", xl: "1.5rem" }}
              alignItems="center"
            >
              <Text fontWeight="500">{title}:</Text>{value}
            </Box>  
    )
}

export default UserDetails