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
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { DeleteIcon } from "@chakra-ui/icons";
import { useState, MouseEventHandler, ChangeEventHandler } from "react";
import UserDetailsInput from "@/components/form/multistepForms/form2/inputs";

interface EducationFormProps {
  handleFileChange: Function;
  handleCollapseAll: any;
  openEmploymentIndex: number;
  handleFormChange: any;
  handleLevelChange: ChangeEventHandler;
  handleDelete: any;
  handleAddNew: any;
  handleToggle: any;
  forms: any;
  isEmploymentCollapsed: boolean;
  setIsChecked: Function;
  handleCheckboxChange: any;
}

const Employment = ({
  handleFileChange,
  handleCollapseAll,
  openEmploymentIndex,
  handleFormChange,
  handleDelete,
  handleToggle,
  handleAddNew,
  isEmploymentCollapsed,
  forms,
  handleCheckboxChange,
}: EducationFormProps) => {
  return (
    <>
      <Flex flexDir="column" mb="1rem">
        <Text as="h1" fontWeight="500">
          Employment Details / WorkExperience
        </Text>
        <Divider borderColor="black" />
      </Flex>
      {forms.length > 1 && (
        <Flex justifyContent="flex-end">
          <Button
            size="sm"
            mb={4}
            onClick={() => handleCollapseAll("employment")}
          >
            {isEmploymentCollapsed ? "Expand" : "Collapse"}
          </Button>
        </Flex>
      )}
      {forms?.map((form: any, index: any) => (
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
            <FormLabel>Employment {index + 1}</FormLabel>
            {forms.length && (
              <SimpleGrid column={1} spacing="1rem">
                {index !== openEmploymentIndex && !isEmploymentCollapsed && (
                  <Button
                    size="sm"
                    onClick={() => handleToggle(index, "employment")}
                    mr={2}
                    leftIcon={<FaPlus />}
                  >
                    {/* {index === openEmploymentIndex ? "Collapse" : "Expand"} */}
                    Expand
                  </Button>
                )}
                <Button
                  leftIcon={<DeleteIcon />}
                  size="sm"
                  onClick={() => handleDelete(index, "employment")}
                >
                  Delete
                </Button>
              </SimpleGrid>
            )}
          </Flex>
          <Collapse
            in={!isEmploymentCollapsed && index === openEmploymentIndex}
            animateOpacity
            startingHeight={2}
            overflow="hidden"
          >
            <UserDetailsInput
            isRequired="no"
              name="position"
              label="Job Position/Title"
              handleFormChange={handleFormChange}
              form={form}
              index={index}
              statetype="employment"
            />
            <UserDetailsInput
            isRequired="no"
              name="employers"
              label="Employers (company Name/Firm/School e.t.c)"
              handleFormChange={handleFormChange}
              form={form}
              index={index}
              statetype="employment"
            />
            <UserDetailsInput
            isRequired="no"
              name="city"
              label="City"
              handleFormChange={handleFormChange}
              form={form}
              index={index}
              statetype="employment"
            />
            <UserDetailsInput
            isRequired="no"
              name="certificate"
              type="file"
              label="Certificate (optional)"
              handleFileChange={handleFileChange}
              form={form}
              index={index}
              statetype="employment"
            />
            <SimpleGrid columns={2} spacing="20px">
              <UserDetailsInput
              isRequired="no"
                type="date"
                name="startdate"
                label="Start Date"
                handleFormChange={handleFormChange}
                form={form}
                index={index}
                statetype="employment"
              />
              <UserDetailsInput
              isRequired="no"
                type="date"
                name="enddate"
                label="End Date"
                handleFormChange={handleFormChange}
                form={form}
                index={index}
                statetype="employment"
              />
            </SimpleGrid>
            <Flex justifyContent="flex-end">
              <Checkbox
                value="present"
                onChange={(e) => handleCheckboxChange(e, index, "employment")}
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
        onClick={() => handleAddNew("employment")}
      >
        Add
      </Button>
    </>
  );
};

export default Employment;
