
import {
  Box,
  Heading,
  useDisclosure,
  Flex,
  Text,
  Avatar,
  SimpleGrid,
  AlertTitle,
  Input,
  AlertDescription,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Image
} from "@chakra-ui/react";
import {useRouter} from "next/router"

const GetTeacher = () => {

    const router = useRouter()
    const { id } = router.query;


    
    return ( 
    <>
        <Text>Your id is {id}</Text>
    </>
     );
}
 
export default GetTeacher