import { Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Copyright = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    const year = new Date().getFullYear().toString();
    setDate((c) => year);
  }, []);

  return (
    <Flex
      w="full"
      textAlign="center"
      justifyItems="center"
      padding={5}
      h={40}
      alignItems="end"
      paddingBottom={6}
    >
      <Text color="white" mx="auto">
        Copyright &copy; Tutor Twist | Powered by Applead {date}{" "}
      </Text>
    </Flex>
  );
};

export default Copyright;
