import {
  Button,
  Flex,
  FormControl,
  SimpleGrid,
  FormLabel,
  Text,
  Input,
  Divider,
  Collapse,
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

interface LanguageFormProps extends Partial<SkillsFormProps> {
    openLanguageIndex: number;
    islanguagesCollapsed: boolean;
}

const Languages = ({
    handleCollapseAll,
    openLanguageIndex,
    handleFormChange,
    handleDelete,
    handleToggle,
    handleAddNew,
    islanguagesCollapsed,
    forms,
}: 
LanguageFormProps) => {

  return (
    <Box borderBottom="5px solid #37254b" pb="2rem" mb="2rem">
      <Flex flexDir="column">
        <Text as="h1" fontWeight="500">
          Languages
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
            onClick={() => handleCollapseAll("language")}
          >
            {islanguagesCollapsed ? "Expand" : "Collapse"}
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
            <FormLabel>Language {index + 1}</FormLabel>
            {forms.length > 1 && (
              <SimpleGrid column={1} spacing="1rem">
                {index !== openLanguageIndex && !islanguagesCollapsed && (
                  <Button
                    size="sm"
                    onClick={() => handleToggle(index, "language")}
                    mr={2}
                    leftIcon={<FaPlus />}
                  >
                    Expand
                  </Button>
                )}
                <Button
                  leftIcon={<DeleteIcon />}
                  size="sm"
                  onClick={() => handleDelete(index, "language")}
                >
                  Delete
                </Button>
              </SimpleGrid>
            )}
          </Flex>
          <Collapse
            in={!islanguagesCollapsed && index === openLanguageIndex}
            // in={true}
            animateOpacity
            startingHeight={2}
            overflow="hidden"
          >
            <Flex>
              <FormControl mt={4}>
                <FormLabel htmlFor="name" fontWeight={"normal"}>
                  Language Type
                </FormLabel>
                <Input
                  id="name"
                  value={form["language"]}
                  pattern="^\S(.*\S)?$"
                  onChange={(e) =>
                    handleFormChange(
                      "language",
                      e.target.value,
                      index,
                      "language"
                    )
                  }
                />
              </FormControl>
            </Flex>

            <Flex flexDir="column" marginTop="1rem">
              <FormLabel fontWeight={"normal"}>Fluency:</FormLabel>

              <Slider
                isDisabled={!form["language"]}
                aria-label="slider-ex-6"
                value={form["fluency"]}
                onChange={(val) =>
                  handleFormChange("fluency", val, index, "language")
                }
                marginTop="2rem"
                mx="auto"
                w="90%"
              >
                <SliderMark
                  value={!form["language"]? 0: form["fluency"]}
                  textAlign="center"
                  bg="purple"
                  rounded="lg"
                  color="white"
                  mt="-10"
                  ml="-5"
                  w="12"
                >
                  {!form["language"]? 0: form["fluency"]}%
                </SliderMark>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb bg="gray" color="gray" />
              </Slider>
            </Flex>
          </Collapse>
        </Flex>
      ))}
      <Button
        type="button"
        w="auto"
        px="1rem"
        colorScheme="red"
        onClick={() => handleAddNew("language")}
      >
        Add
      </Button>
    </Box>
  );
};

export default Languages;
