// import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";

interface AvailabiltyInputProps{
    label: string;
    name: string;
    handleChange: any;
    details: any;
}

const AvailabilityInput = ({label, name, handleChange, details}: AvailabiltyInputProps) => {

  return (
<FormControl mr="5%">
                <FormLabel fontWeight={"normal"}>
                    What {label} are you available at?
                </FormLabel>
                  <Input
                    pattern="^\S(.*\S)?$"
                    pr="4.5rem"
                    name={name}
                    placeholder={`${label} of availabity`}
                    bg="#fff"
                    value={details[name]}
                    onChange={handleChange}
                    // onKeyDown={handleKeyDown}
                    />
              </FormControl>  );
};

export default AvailabilityInput;
