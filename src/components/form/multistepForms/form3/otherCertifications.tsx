import {
  Button,
  Flex,
  FormControl,
  SimpleGrid,
  FormLabel,
  Text,
  Input,
Textarea,
  Divider,
  Collapse,
  Checkbox,
  SliderMark,
  SliderTrack,
  SliderThumb,
  Slider,
  SliderFilledTrack,
  Box,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { DeleteIcon } from "@chakra-ui/icons";
import { SkillsFormProps } from "./skills";
import UserDetailsInput from "../../multistepForms/form2/inputs"

interface OtherCertificationsFormProps extends Partial<SkillsFormProps> {
    openOtherCertificationsIndex: number;
    isotherCertificationsCollapsed: boolean;
    handleFileChange: any
}

const OtherCertifications = ({
    handleCollapseAll,
    openOtherCertificationsIndex,
    handleFormChange,
    handleDelete,
    handleToggle,
    handleAddNew,
    isotherCertificationsCollapsed,
    forms,
    handleFileChange
}: 
OtherCertificationsFormProps) => {

  return (
    <Box borderBottom="5px solid #37254b" pb="2rem" mb="2rem">
      <Flex flexDir="column">
        <Text as="h1" fontWeight="500">
          Other Certifications
        </Text>
        <Divider borderColor="black" />
        <Flex width="100%" flexDir="column">
          <Flex
            flexDir="row"
            py="5px"
            justifyContent="space-between"
            alignItems="center"
            w="100%"
          ></Flex>
        </Flex>
      </Flex>

      {forms.length > 1 && (
        <Flex justifyContent="flex-end">
          <Button
            size="sm"
            mb={4}
            onClick={() => handleCollapseAll("certificate")}
          >
            {isotherCertificationsCollapsed ? "Expand" : "Collapse"}
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
            <FormLabel>Certificate {index + 1}</FormLabel>
            {forms.length > 1 && (
              <SimpleGrid column={1} spacing="1rem">
                {index !== openOtherCertificationsIndex &&
                  !isotherCertificationsCollapsed && (
                    <Button
                      size="sm"
                      onClick={() => handleToggle(index, "certificate")}
                      mr={2}
                      leftIcon={<FaPlus />}
                    >
                      Expand
                    </Button>
                  )}
                <Button
                  leftIcon={<DeleteIcon />}
                  size="sm"
                  onClick={() => handleDelete(index, "certificate")}
                >
                  Delete
                </Button>
              </SimpleGrid>
            )}
          </Flex>
          <Collapse
            in={
              !isotherCertificationsCollapsed &&
              index === openOtherCertificationsIndex
            }
            // in={true}
            animateOpacity
            startingHeight={2}
            // overflow="hidden"
          >
            <Flex>
              <FormControl mr="5%">
                <FormLabel htmlFor="certificate" fontWeight={"normal"}>
                  Certificate file
                </FormLabel>
                <Input
                  name="certificate"
                  type='file'
                  placeholder="bulaba"
                  onChange={(e) => handleFileChange(e, "certiFile", index)}
                />
              </FormControl>
            </Flex>

            <Flex flexDir="column" marginTop="1rem">
              <FormLabel fontWeight={"normal"}>Description:</FormLabel>

              <Textarea
                value={form["description"]}
                disabled={form["certiFile"] === ""}
                onChange={(e) =>
                  handleFormChange(
                    "description",
                    e.target.value,
                    index,
                    "certificate"
                  )
                }
                placeholder="Add a description of the certificate."
                size="sm"
              />
            </Flex>
          </Collapse>
        </Flex>
      ))}
      <Button
        type="button"
        w="auto"
        px="1rem"
        colorScheme="red"
        onClick={() => handleAddNew("certificate")}
      >
        Add
      </Button>
    </Box>
  );
};

export default OtherCertifications;
