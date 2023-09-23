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
      color="white"
      _placeholder={{ color: "white" }}
      bg="#1b1222"
    />
  );
};

export default FormInput;
