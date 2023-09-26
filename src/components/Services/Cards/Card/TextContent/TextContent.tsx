import { UIButton } from "@/components/Global";
import { theme } from "@/utils/chakratheme";
import { Flex, Stack, Text } from "@chakra-ui/react";

const TextContent = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <Flex
      flexDirection="column"
      bg="primary.default"
      alignItems="space-between"
      justifyItems="space-between"
      color={theme.colors.white}
      flex={1}
      _hover={{
        bg: "white",
        transition: "background .5s",
        color: theme.colors.black,
        borderBottom: "1px solid #37254b",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
      <Text
        fontSize={{ base: "1.2rem", md: "1.2rem" }}
        fontWeight={900}
        marginTop={3}
        textAlign="center"
        padding={6}
      >
        {title}
      </Text>
      <Text
        marginTop={{ base: -7, md: -8 }}
        marginBottom=".4rem"
        fontSize={{ base: "1rem", md: ".9rem" }}
        textAlign="center"
        paddingY={6}
        maxWidth={{ base: "80%", md: "88%" }}
        mx="auto"
        flex={1}
      >
        {description}
      </Text>
      <Stack align="center" display="flex" justifyItems="end" marginBottom={10}>
        <UIButton
          link="/about"
          bg="warning.default"
          borderColor="transparent"
          borderRadius={4}
          transform="scale(105%)"
        >
          Learn More
        </UIButton>
      </Stack>
    </Flex>
  );
};

export default TextContent;
