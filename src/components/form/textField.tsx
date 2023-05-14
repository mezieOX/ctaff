import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";

interface TextInputProps {
    label: string;
    type: string;
    name: string;
    setInputState: Function;
    inputsState: any;
}

const TextInput = ({label, type, name, setInputState, inputsState}: TextInputProps) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  let inputType;
  if(type === 'password')
    inputType = show ? "text" : "password";
  else
    inputType = type

  const handleInputChange = (e: any) => {
    let {name, value} = e.target
    setInputState((prevVal: any) => ({...prevVal, [name]: value}))
  }

  return (
    <FormControl
      variant="floating"
      isRequired
    >
      <InputGroup size="md">
        <Input
          errorBorderColor="crimson"
          focusBorderColor="#37254b"
          pr="4.5rem"
          type={inputType}
          placeholder=""
          bg="#fff"
          name={name}
          minLength={type === "password" ? 8 : undefined}
          value={inputsState[name]}
          onChange={handleInputChange}
          pattern="^\S(.*\S)?$"
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
            `
          </InputRightElement>
        )}
      </InputGroup>

      <FormLabel>{label}</FormLabel>
      {/* {
        error ? (
          errormessage && <FormErrorMessage fontWeight={700}>{errormessage}</FormErrorMessage>
        ) : (
          helper && <FormHelperText color="white">{helper}</FormHelperText>
        )
        // ({errormessage && <FormErrorMessage>{errormessage}</FormErrorMessage>}):
        // ({helper && <FormHelperText color="white">{helper}</FormHelperText>})
      } */}
    </FormControl>
  );
};

export default TextInput;
