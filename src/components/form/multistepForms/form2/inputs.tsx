// import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";

interface UserDetailsInputProps{
    type?: string;
    label: string;
    name: string;
    isRequired?: string;
    statetype?: string;
    handleFormChange?: Function;
    handleFileChange?: any;
    form: any;
    index: number;
}

const UserDetailsInput = ({type, label, name, handleFormChange, handleFileChange, form, index, isRequired, statetype}: UserDetailsInputProps) => {

  return (
    <FormControl mt={4} isRequired={isRequired? false: true}>
        <FormLabel htmlFor="name" fontWeight={"normal"}>
        {label}
        </FormLabel>
        <Input
          pattern="^\S(.*\S)?$"
          id="name"
          autoComplete="on"
          type={type ?? "text"}
          value={handleFormChange && form[name]}
          name={name}
          onChange={handleFormChange? (e) => handleFormChange(name, e.target.value, index, statetype): (e) => handleFileChange(e, name, "", index, statetype)}
        />
    </FormControl>
  );
};

export default UserDetailsInput
