import { FormInput, TextArea } from "@/components/Global";
import { Button, Flex } from "@chakra-ui/react";
import { useState } from "react";

const Form = () => {
  const [message, setMessage] = useState("Send Message");

  return (
    <Flex
      flexDir="column"
      gridColumnStart={{ base: "0", md: 0, xl: "1" }}
      gridColumnEnd={{ base: "-1", md: -1 }}
      justify={{ base: "center", xl: "start" }}
      gap={6}
      width={{ base: "100%", xl: "50%" }}
      marginTop={{ base: "2rem", md: 0 }}
      marginBottom={{ base: "1rem", sm: 0 }}
    >
      <Flex gap={{ base: 2, sm: 6 }}>
        <FormInput placeholder="Email" />
        <FormInput placeholder="Achiever" />
      </Flex>
      <FormInput placeholder="someone@gmail.com" />
      <TextArea placeholder="Write something here..." />

      <Button
        colorScheme="teal"
        width="max"
        variant="outline"
        _hover={{
          border: "1px solid white",
          bg: "transparent",
          color: "white",
          transition: "all .2s ease-in",
        }}
        px={{ base: 3, sm: 9 }}
        py={{ base: 2, sm: 7 }}
        color="white"
        fontSize={{ base: ".8", sm: "1rem" }}
        bg="red.500"
        border="none"
        borderRadius={0}
        onClick={() => setMessage("Loading...")}
      >
        {message}
      </Button>
    </Flex>
  );
};

export default Form;
