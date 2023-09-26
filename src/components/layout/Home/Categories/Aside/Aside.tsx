import UIButton from "@/components/Global/Button/Button";
import { theme } from "@/utils/chakratheme";
import { Flex, Stack, Text } from "@chakra-ui/react";

const Aside = () => {
  return (
    <Flex
      flexDirection="column"
      alignItems={["start", "flex-start"]}
      textAlign={["left", "left"]}
      marginTop={["2rem", "5rem"]}
      marginBottom={["2rem", "0"]}
      gap="3rem"
      width={["100%", "80%", "65%"]}
    >
      <Text
        as="div"
        flex={1}
        color={theme.colors.primary.default}
        fontSize={["2rem", "3rem", "2.1rem"]}
        height={["300px", "270px", "250px"]}
        fontWeight={900}
        lineHeight="1.3"
      >
        Categories
      </Text>
      <Text as="div" flex={1} marginTop={-8} color={theme.colors.black}>
        Explore teaching careers and connect with educators in diverse
        categories. Teachers, find job opportunities in your field. Learners,
        discover qualified instructors tailored to your specific needs. Your
        educational journey starts now.
      </Text>
      <Stack direction="row" spacing={4} align="center">
        <UIButton
          link="/about"
          bg="transparent"
          hoverBorder="1px solid"
          borderColor={theme.colors.primary.default}
          color={theme.colors.primary.default}
          hoverColor={theme.colors.primary.default}
        >
          Learn More
        </UIButton>
      </Stack>
    </Flex>
  );
};

export default Aside;
