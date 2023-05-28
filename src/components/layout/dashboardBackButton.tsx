import {
  Box,
  Flex,
  Button,
} from "@chakra-ui/react";
import { ChevronLeftIcon } from '@chakra-ui/icons'
import {useRouter} from "next/router"

const BackButton = ({rbg}: {rbg?: string}) => {
  const router = useRouter()

  const goBack = () => {
    router.back()
  }

  return ( 
      <Flex justifyContent="flex-start" mb="3rem">
        <Button
          bg={rbg? "white": "#37254b"}
          color={rbg? "#37254b": "white"}
          _hover={{ color: rbg? "#37254b": "white", shadow:"inset 1px 1px 5px 4px rgba(0,0,0,0.2);" }}
          onClick={goBack}
        >
          <ChevronLeftIcon /> Back
        </Button>
      </Flex>
    );
}
 
export default BackButton;