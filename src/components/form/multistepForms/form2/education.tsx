import {
  Button,
  Flex,
  FormControl,
  SimpleGrid,
  FormLabel,
  Text,
  Input,
  Select,
  Divider,
  Collapse,
  Checkbox,
  Box,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { DeleteIcon } from "@chakra-ui/icons";
import { useState, MouseEventHandler, ChangeEventHandler } from "react";
import UserDetailsInput from "./inputs";

interface EducationFormProps {
  handleFileChange: Function;
  handleCollapseAll: any;
  openEduIndex: number;
  handleFormChange: any;
  handleLevelChange: ChangeEventHandler;
  handleDelete: any;
  handleAddNew: any;
  handleToggle: any;
  forms: any;
  //   isChecked: boolean;
  isEduCollapsed: boolean;
  setIsChecked: Function;
  handleCheckboxChange: any;
}

const Education = ({
  handleLevelChange,
  handleFileChange,
  handleCollapseAll,
  openEduIndex,
  handleFormChange,
  handleDelete,
  handleToggle,
  handleAddNew,
  isEduCollapsed,
  forms,
  handleCheckboxChange,
}: EducationFormProps) => {
  return (
    <Box borderBottom="5px solid #37254b" pb="2rem" mb="2rem">
      <Flex flexDir="column">
        <Text as="h1" fontWeight="500">
          Educational Details
        </Text>
        <Divider borderColor="black" />
        <Flex width="100%" flexDir="column">
          <Flex
            flexDir="row"
            py="5px"
            justifyContent="space-between"
            alignItems="center"
            w="100%"
          >
            <Text as="h3" w="50%">
              Level of education:
            </Text>
            <FormControl size="md" isRequired>
              <Select
                name="applyingAs"
                placeholder="-- Select Level --"
                focusBorderColor="brand.400"
                shadow="sm"
                bg="#fff"
                // size="sm"
                w="50%"
                rounded="md"
                onChange={handleLevelChange}
              >
                <option value="graduate">Graduate</option>
                <option value="undergraduate">Undergraduate</option>
                <option value="ssce">SSCE</option>
              </Select>
            </FormControl>
          </Flex>
          <Flex
            flexDir="row"
            py="5px"
            justifyContent="space-between"
            alignItems="center"
            w="100%"
          >
            <Text as="h3" w="50%">
              Upload O&apos;level result:
            </Text>
            <FormControl size="sm" isRequired>
              <Input
                w={["100%", "50%}"]}
                onChange={(e) =>
                  handleFileChange(e, "olevelResult", "olevelresult")
                }
                type="file"
              />
            </FormControl>
          </Flex>
        </Flex>
      </Flex>

      {forms.length > 1 && (
        <Flex justifyContent="flex-end">
          <Button size="sm" mb={4} onClick={handleCollapseAll}>
            {isEduCollapsed ? "Expand" : "Collapse"}
          </Button>
        </Flex>
      )}
      {forms.map((form: any, index: any) => (
        <Flex
          key={index}
          border="2px solid #dfd9d9"
          gap="1rem"
          flexDir="column"
          rounded="lg"
          p="1rem"
          mb="2rem"
        >
          <Flex justifyContent="space-between" alignItems="center">
            <FormLabel>Education {index + 1}</FormLabel>
            {forms.length > 1 && (
              <SimpleGrid column={1} spacing="1rem">
                {index !== openEduIndex && !isEduCollapsed && (
                  <Button
                    size="sm"
                    onClick={() => handleToggle(index)}
                    mr={2}
                    leftIcon={<FaPlus />}
                  >
                    {/* {index === openEduIndex ? "Collapse" : "Expand"} */}
                    Expand
                  </Button>
                )}
                <Button
                  leftIcon={<DeleteIcon />}
                  size="sm"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </Button>
              </SimpleGrid>
            )}
          </Flex>
          <Collapse
            in={!isEduCollapsed && index === openEduIndex}
            animateOpacity
            startingHeight={2}
            // overflow="hidden"
          >
            <UserDetailsInput
              name="edutype"
              label="Education Type (e.g Primary, secondary, tertiary e.t.c)"
              handleFormChange={handleFormChange}
              form={form}
              index={index}
            />
            <UserDetailsInput
              name="school"
              label="School"
              handleFormChange={handleFormChange}
              form={form}
              index={index}
            />
            <UserDetailsInput
              name="city"
              label="City"
              handleFormChange={handleFormChange}
              form={form}
              index={index}
            />
            <UserDetailsInput
              type="file"
              name="certificate"
              label="Result/Certificate"
              handleFileChange={handleFileChange}
              form={form}
              index={index}
            />
            <SimpleGrid columns={2} spacing="20px">
              <UserDetailsInput
                type="date"
                name="startdate"
                label="Start Date"
                handleFormChange={handleFormChange}
                form={form}
                index={index}
              />
              <UserDetailsInput
                type="date"
                name="enddate"
                label="End Date"
                handleFormChange={handleFormChange}
                form={form}
                index={index}
              />
            </SimpleGrid>
            <Flex justifyContent="flex-end">
              <Checkbox
                value="present"
                onChange={(e) => handleCheckboxChange(e, index)}
              >
                Present
              </Checkbox>
            </Flex>
          </Collapse>
        </Flex>
      ))}
      <Button
        type="button"
        w="auto"
        px="1rem"
        colorScheme="red"
        onClick={handleAddNew}
      >
        Add
      </Button>
    </Box>
  );
};

export default Education;
