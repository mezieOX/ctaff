import {
  Box,  
  Heading,
  CircularProgress,
  CircularProgressLabel,
  Text,
  Alert,
  AlertTitle,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/react";
import {FaBell} from 'react-icons/fa'
import { useEffect, useState } from "react";
import Notifications from "./notifications"

const DashBoardHome = () => {

  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const now = new Date()
    const currhr = now.getHours()

    if(currhr < 12)
      setGreeting("Good Morning")
    else if(currhr < 18)
      setGreeting("Good Afternoon")
    else
      setGreeting("Good Evening")

  }, []);

  return (
    <Box mt="2rem">
      <Heading>{greeting}, Tinubu!</Heading>
      <Text as="h3">Welcome 🎉</Text>
      <Alert
        h="15rem"
        status="info"
        variant="subtle"
        flexDirection="column"
        // bg="linear-gradient(50deg, rgba(-198, 2, 52, -1.99), gray);"
        // alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
      >
        <AlertIcon as={FaBell} boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Welcome Tinubu!
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          You can now view Job alerts from your dashboard and edit your availability profile too and others.
          Enjoy the ride!
        </AlertDescription>
      </Alert>{" "}
    </Box>
  );
};

export default DashBoardHome;
