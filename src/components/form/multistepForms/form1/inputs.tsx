import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputRightElement,
  Button,
  InputGroup
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

interface RegisterFormInputsProps{
    type: string;
    label: string;
    name: string;
    disabled?: boolean;
    value?: string;
    pholder?: string;
    register?: any;
    error?: any;
    color?: string;
    required?: string;
}

const RegisterFormInputs = ({type, label, name, disabled, value, register, pholder, error, color, required}: RegisterFormInputsProps) => {

    const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <FormControl mr="5%" isRequired={required? false: true} isInvalid={!!error}>
      <FormLabel htmlFor={name} fontWeight={"normal"} color={color ? color:  type === "password" ?"white": "#000"}>
        {label}
      </FormLabel>
            <InputGroup size="md">

      <Input
        pattern="^\S(.*\S)?$"
        focusBorderColor={!!error && 'red.300'}
        errorBorderColor="red.300"
        readOnly={disabled}
        autoComplete="on"
        value={value}
        disabled={disabled}
        {...register(name)}
        id={name}
        bg="#fff"
        name={name}
        type={type === "password" && !show ? 'password' : 'text'}
        placeholder={pholder ?? label}
      />
              {type === "password" && (
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              variant="none"
              onClick={handleClick}
              bg="none"
            >
              {show ? <ViewIcon /> : <ViewOffIcon />}
            </Button>
          </InputRightElement>
        )}
    </InputGroup>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default RegisterFormInputs;
