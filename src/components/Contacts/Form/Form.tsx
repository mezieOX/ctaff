import { FormInput, TextArea } from "@/components/Global";
import {  Button, Flex,  } from "@chakra-ui/react";

const Form = () => {
  return (
    <Flex
      flexDir="column"
      gridColumnStart={{ base: "0", md: 0, xl: "1" }}
      gridColumnEnd={{ base: "-1", md: -1 }}
      justify={{ base: "center", xl: "start" }}
      gap={6}
      width={{ base: "100%", xl: "50%" }}
      marginTop={{ base: "2rem", md: 0 }}
    >
      <Flex gap={6}>
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
        px={9}
        py={7}
        color="white"
        bg="red.500"
        border="none"
        borderRadius={0}
        marginTop={{ base: "1.5rem", sm: 0 }}
      >
        Send Message
      </Button>
    </Flex>
  );
};

export default Form;
