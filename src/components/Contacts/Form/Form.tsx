import { FormInput, TextArea, UIButton } from "@/components/Global";
import { Flex } from "@chakra-ui/react";

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
      marginBottom={{ base: "1rem", sm: 0 }}
    >
      <Flex gap={{ base: 2, sm: 6 }}>
        <FormInput placeholder="Email" />
        <FormInput placeholder="Achiever" />
      </Flex>
      <FormInput placeholder="someone@gmail.com" />
      <TextArea placeholder="Write something here..." />

      <UIButton link="" borderColor="transparent" bg="primary.default">
        Proceed
      </UIButton>
    </Flex>
  );
};

export default Form;
