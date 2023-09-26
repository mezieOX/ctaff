import { theme } from "@/utils/chakratheme";
import { Input } from "@chakra-ui/react";

const FormInput = ({
  type = "text",
  placeholder,
}: {
  type?: string;
  placeholder: string;
}) => {
  return (
    <Input
      placeholder={placeholder}
      type={type}
      border="2px solid"
      borderColor={theme.colors.gray.default}
      _focus={{
        border: "1px solid",
        borderColor: theme.colors.primary.default,
      }}
      color="black"
      _placeholder={{ color: theme.colors.black }}
      bg="white"
    />
  );
};

export default FormInput;
