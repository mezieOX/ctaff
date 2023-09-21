import { Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Copyright = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    const year = new Date().getFullYear().toString();
    setDate((c) => year);
  }, []);

  return (
    <Flex w="full" justify="center" padding={5} h={40} alignItems="end">
      <Text color="white">Copyright &copy; IYKELNHUB {date} </Text>
    </Flex>
  );
};

export default Copyright;
