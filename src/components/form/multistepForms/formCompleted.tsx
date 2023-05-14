import { motion } from "framer-motion";
import {
  Progress,
  Box,
  useToast,
  AlertTitle,
  Alert,
  AlertDescription,
  AlertIcon,
} from "@chakra-ui/react";
import Confetti from "react-confetti";
import React, { useEffect, useState } from "react";

function FormCompleted({ runConfetti }: { runConfetti: boolean }) {

  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  }, []);

  return (
    <motion.div
      key="form1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Confetti
        run={runConfetti}
        recycle={false}
        width={windowWidth}
        height={windowHeight}
      />
      <Alert
        status="success"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="300px"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Application submitted!
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          Thanks for submitting your application. Anticipate a feedback from us
          soon :-).
        </AlertDescription>
      </Alert>
    </motion.div>
  );
}

export default FormCompleted;
