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

interface UpdateBasicDetailsProps{
    type: string;
    label: string;
    name: string;
    pholder?: string;
    color?: string;
    handleInputsChange: any
    loadedData: any
    data: any
}
// ? data[name]: loadedData[name]
const UpdateBasicDetails = ({type, label, name, pholder, color, handleInputsChange, loadedData, data}: UpdateBasicDetailsProps) => {

  return (
    <FormControl mr="5%">
      <FormLabel htmlFor={name} fontWeight={"normal"} color={color ? color:  type === "password" ?"white": "#000"}>
        {label}
      </FormLabel>
        <Input
          pattern="^\S(.*\S)?$"
          bg="#fff"
          type='text'
          name={name}
          value={loadedData[name]}
          onChange={handleInputsChange}
          placeholder={pholder ?? label}
        />
    </FormControl>
  );
};

export default UpdateBasicDetails;
