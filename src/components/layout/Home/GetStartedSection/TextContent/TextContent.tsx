import { Flex, Stack, Text } from "@chakra-ui/react";
import Typewriter from "typewriter-effect";
import UIButton from "@/components/Global/Button/Button";
import { theme } from "@/utils/chakratheme";

const TextContent = () => {
  return (
    <Flex
      flexDirection="column"
      alignItems={{ base: "center", md: "flex-start" }}
      textAlign={{ base: "center", md: "left" }}
      marginTop={["2rem", "5rem"]}
      marginBottom={["2rem", "0"]}
      gap={["1rem", "3rem"]}
      width={{ base: "100%", md: "50%", lg: "70%" }}
    >
      <Text
        as="div"
        flex={1}
        color={theme.colors.primary.default}
        fontSize={{ base: "2rem", sm: "3rem", md: "2.1rem", xl: "2.1rem" }}
        height={["300px", "270px", "250px"]}
        fontWeight={900}
        lineHeight="1.3"
      >
        {/* <Typewriter
          options={{
            strings: ["Hi there!, What subject do you teach passionate?"],
            autoStart: true,
            loop: true,
          }}
        /> */}
        <Typewriter
          options={{
            strings: [
              "Hi there!,<br> What subject do you teach passionately?",
              "Are you looking<br> for a cover teacher?",
              "<Click the button below 👇 to get started!",
            ],
            cursor: "",
            autoStart: true,
            loop: true,
            skipAddStyles: true,
            deleteSpeed: 50,
            delay: 50,
          }}
        />
      </Text>
      <Text
        as="div"
        flex={1}
        marginTop={{ base: ".2rem", sm: -8 }}
        color={theme.colors.black}
      >
        Explore Educational Opportunities - Teachers, Find Jobs; Learners,
        Discover Educators. Connect and Embark on Your Educational Journey.
      </Text>
      <Stack direction="row" spacing={4} align="center">
        <UIButton link="/who_am_i" bg="primary.default">
          Get Started
        </UIButton>
      </Stack>
    </Flex>
  );
};

export default TextContent;
