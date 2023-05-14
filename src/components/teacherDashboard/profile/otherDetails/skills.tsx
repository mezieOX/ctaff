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

export interface SkillsFormProps {
  handleCollapseAll: any;
  openSkillIndex: number;
  handleFormChange: any;
  handleDelete: any;
  handleAddNew: any;
  handleToggle: any;
  forms: any;
  isSkillsCollapsed: boolean;
}

const Skills = ({
  handleCollapseAll,
  openSkillIndex,
  handleFormChange,
  handleDelete,
  handleToggle,
  handleAddNew,
  isSkillsCollapsed,
  forms,
}: SkillsFormProps) => {
  return (
    <Box borderBottom="5px solid #37254b" pb="2rem" mb="2rem">
      <Flex flexDir="column">
        <Text as="h1" fontWeight="500">
          Skills
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
          <Button size="sm" mb={4} onClick={handleCollapseAll}>
            {isSkillsCollapsed ? "Expand" : "Collapse"}
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
            <FormLabel>Skill {index + 1}</FormLabel>
            {forms.length > 1 && (
              <SimpleGrid column={1} spacing="1rem">
                {index !== openSkillIndex && !isSkillsCollapsed && (
                  <Button
                    size="sm"
                    onClick={() => handleToggle(index)}
                    mr={2}
                    leftIcon={<FaPlus />}
                  >
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
            in={!isSkillsCollapsed && index === openSkillIndex}
            // in={true}
            animateOpacity
            startingHeight={2}
            overflow="hidden"
          >
            <Flex>
              <FormControl mt={4}>
                <FormLabel htmlFor="name" fontWeight={"normal"}>
                  Skill Type
                </FormLabel>
                <Input
                  id="name"
                  value={form["skill"]}
                  onChange={(e) =>
                    handleFormChange("skill", e.target.value, index, "")
                  }
                />
              </FormControl>
            </Flex>
              
            {<Flex flexDir="column" marginTop="1rem">
              <FormLabel fontWeight={"normal"}>Level:</FormLabel>

              <Slider
                aria-label="slider-ex-6"
                value={form["level"]}
                onChange={(val) => handleFormChange("level", val, index, "")}
                marginTop="2rem"
                mx="auto"
                w="90%"
              >
                <SliderMark
                  value={form["level"]}
                  textAlign="center"
                  bg="purple"
                  rounded="lg"
                  color="white"
                  mt="-10"
                  ml="-5"
                  w="12"
                >
                  {form["level"]}%
                </SliderMark>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb bg="gray" color="gray" />
              </Slider>
            </Flex>}
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

export default Skills;
