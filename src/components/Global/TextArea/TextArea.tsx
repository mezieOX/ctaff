import { theme } from "@/utils/chakratheme";
import { Textarea } from "@chakra-ui/react";

const TextArea = ({
  placeholder = "Here is a sample placeholder",
}: {
  placeholder?: string;
}) => {
  return (
    <Textarea
      placeholder={placeholder}
      _placeholder={{ color: "black" }}
      h={40}
      color="black"
      bg="white"
      border="2px solid"
      borderColor={theme.colors.gray.default}
      _focus={{
        border: "1px solid",
        borderColor: theme.colors.primary.default,
      }}
    />
  );
};

export default TextArea;
