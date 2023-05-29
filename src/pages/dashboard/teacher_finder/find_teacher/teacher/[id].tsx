import {
  Box,
  Badge,
  Divider ,
  Flex,
  Text,
  Button,
  UnorderedList,
  ListItem,
  Image, 
  useDisclosure
} from "@chakra-ui/react";
import { ColorRing } from "react-loader-spinner";
import {useState} from 'react'
import {useRouter} from "next/router"
import { CheckCircleIcon } from '@chakra-ui/icons'
import { motion } from "framer-motion";
import OrderTeachModal from "@/components/teachFinderDashboard/order_teach_modal";
import BackButton from "@/components/layout/dashboardBackButton";

const GetTeacher = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [teacher, setTeacher] = useState({})
    const [ordering, setOrdering] = useState(false)
    const [ordered, setOrdered] = useState(false)

    const router = useRouter()
    const { id } = router.query;

    const handleTeachOrder = () => {
        onOpen()
    }

    return (
    <motion.div
      key="teacher"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >

      <Box minHeight="100vh" mx={{base: "1rem", md: "3rem"}} my="3rem">
        <BackButton/>
        <Flex
          gap="2rem"
          height="auto"
          flexDirection={{ base: "column", md: "row" }}
          alignItems="center"
          pos="relative"
        >
          <OrderTeachModal onClose={onClose} isOpen={isOpen} />
          <Box
            // objectFit="center"
            objectFit="cover"
            w={{ base: "100%", md: "70%", lg: "60%" }}
            rounded="lg"
            overflow="hidden"
          >
            <Image
              width="100%"
              height="100%"
              src="https://res.cloudinary.com/bluebberies/image/upload/v1684218709/pg2q4plxrvlnqsqtqhwx.jpg"
              alt="teacher"
            />
          </Box>
          <Flex
            w={{ base: "100%", md: "70%", lg: "50%" }}
            flexDir="column"
            gap=".5rem"
          >
            <Box
              display="flex"
              gap="1rem"
              fontSize={{md: "17px", xl: "1.5rem"}}
              alignItems="center"
            >
              <Text fontWeight="500">Firstname:</Text>Francis{" "}
            </Box>
            <Box
              display="flex"
              gap="1rem"
              fontSize={{md: "17px", xl: "1.5rem"}}
              alignItems="center"
            >
              <Text fontWeight="500">Lastname:</Text>Okonkwo
            </Box>
            <Box
              display="flex"
              gap="1rem"
              fontSize={{md: "17px", xl: "1.5rem"}}
              alignItems="center"
            >
              <Text fontWeight="500">Gender:</Text>Male
            </Box>
            <Box
              display="flex"
              gap="1rem"
              fontSize={{md: "17px", xl: "1.5rem"}}
              alignItems="center"
            >
              <Text fontWeight="500">City:</Text>Lagos
            </Box>
            <Box
              display="flex"
              gap="1rem"
              fontSize={{md: "17px", xl: "1.5rem"}}
              alignItems="center"
            >
              <Text fontWeight="500">State of Origin:</Text>Anambra
            </Box>
            <Box
              display="flex"
              gap="1rem"
              fontSize={{md: "17px", xl: "1.5rem"}}
              alignItems="center"
            >
              <Text fontWeight="500">Nationality:</Text>Nigeria
            </Box>
            <Box
              display="flex"
              gap="1rem"
              fontSize={{md: "17px", xl: "1.5rem"}}
              alignItems="center"
            >
              <Text fontWeight="500">Status:</Text>
              <Badge
                colorScheme="green"
                display="flex"
                height="25px"
                rounded="lg"
                justifyContent="center"
                alignItems="center"
              >
                Available
              </Badge>
            </Box>
            <Box
              display="flex"
              gap="1rem"
              fontSize={{md: "17px", xl: "1.5rem"}}
              alignItems="center"
            >
              <Text fontWeight="500">Highest Degree Obtained:</Text>Bsc.
            </Box>
            <Box
              display="flex"
              gap="1rem"
              fontSize={{md: "17px", xl: "1.5rem"}}
              alignItems="center"
            >
              <Text fontWeight="500">Years of teaching experience:</Text>6 - 12
              months
            </Box>
          </Flex>
        </Flex>
        <Divider mt="3rem" borderWidth="1px" borderColor="gray" />
        <Box>
          <Flex flexDir="column">
            <Text fontWeight="700" fontSize={{base: "17px", md: "1.5rem"}} textDecor="underline">
              Availability Days
            </Text>
            <UnorderedList>
              <ListItem>Lorem ipsum dolor sit amet</ListItem>
              <ListItem>Consectetur adipiscing elit</ListItem>
              <ListItem>Integer molestie lorem at massa</ListItem>
              <ListItem>Facilisis in pretium nisl aliquet</ListItem>
            </UnorderedList>
          </Flex>
          <Flex flexDir="column" mt="2rem">
            <Text fontWeight="700" fontSize={{base: "17px", md: "1.5rem"}} textDecor="underline">
              Availability Location
            </Text>
            <Box display="flex" gap=".5rem" alignItems="center">
              <Text fontWeight="700">City:</Text>Surulere
            </Box>
            <Box display="flex" gap=".5rem" alignItems="center">
              <Text fontWeight="700">State:</Text>Lagos
            </Box>
          </Flex>
          <Flex flexDir="column" mt="2rem">
            <Text fontWeight="700" fontSize={{base: "17px", md: "1.5rem"}} textDecor="underline">
              Teachable Subject(s)
            </Text>
            <UnorderedList>
              <ListItem>Maths</ListItem>
              <ListItem>English</ListItem>
              <ListItem>IBio</ListItem>
            </UnorderedList>
          </Flex>
          <Flex flexDir="column" mt="2rem">
            <Text fontWeight="700" fontSize={{base: "17px", md: "1.5rem"}} textDecor="underline">
              Teachable Level(s)
            </Text>
            <UnorderedList>
              <ListItem>Primary</ListItem>
              <ListItem>Secondary</ListItem>
            </UnorderedList>
          </Flex>

          <Flex justifyContent="flex-end" mt="2rem">
            <Button
              bg="#37254b"
              color="white"
              isDisabled={ordering || ordered}
              _hover={{ color: "white" }}
              onClick={handleTeachOrder}
            >
              {ordered ? (
                <>
                  <CheckCircleIcon /> <Text ml="5px">Ordered</Text>
                </>
              ) : (
                "Order Teacher"
              )}
              {ordering && <ColorRing width={30} height={30} />}
            </Button>
          </Flex>
        </Box>
      </Box>
      </motion.div>
    );
}
 
export default GetTeacher