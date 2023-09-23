import { Textarea } from "@chakra-ui/react";

const TextArea = ({
  placeholder = "Here is a sample placeholder",
}: {
  placeholder?: string;
}) => {
  return (
    <Textarea
      placeholder={placeholder}
      _placeholder={{ color: "white" }}
      h={40}
      color="white"
      bg="#1b1222"
    />
  );
};

export default TextArea;
