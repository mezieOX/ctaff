import questions from "@/data/Questions";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Grid,
  Text,
} from "@chakra-ui/react";

interface CardsProps {
  id: number;
  question: string;
  answer: string;
}

const SingleAccordion = () => {
  return (
    <Box>
      <Accordion allowToggle>
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }}
          gap={4}
          flexDirection="column"
          alignItems={["center", "flex-start"]}
          textAlign={["center", "left"]}
          marginBottom={["2rem", "0"]}
          marginTop={{ base: "5rem", md: "0" }}
          color="white"
          w="full"
        >
          {questions.map(({ id, question, answer }: CardsProps) => (
            <AccordionItem
              flex={1}
              bg="#584FF2"
              padding={{ base: 8, md: 3.5 }}
              paddingLeft={{ base: 1, sm: 2, md: 3.5 }}
              paddingRight={{ base: 0, sm: 8, md: 3.5 }}
              borderColor="transparent"
              key={id}
              _last={{ visibility: "hidden" }}
            >
              {({ isExpanded }) => (
                <>
                  <Box
                    height={{ base: "5rem", sm: "3rem" }}
                    display="flex"
                    alignItems="center"
                  >
                    <AccordionButton
                      gap={{ base: 4, sm: 6 }}
                      w="100%"
                      outline={0}
                    >
                      {isExpanded ? (
                        <MinusIcon fontSize="12px" />
                      ) : (
                        <AddIcon fontSize="12px" />
                      )}
                      <Text
                        as="span"
                        flex="1"
                        fontSize={{ sm: "1.2rem", md: "1rem" }}
                        textAlign="left"
                      >
                        {question}
                      </Text>
                    </AccordionButton>
                  </Box>
                  <AccordionPanel pb={4}>
                    <Text
                      as="span"
                      flex="1"
                      fontSize={{ sm: "1.2rem", md: "1rem" }}
                      textAlign="left"
                    >
                      {answer}
                    </Text>
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          ))}
        </Grid>
      </Accordion>
    </Box>
  );
};

export default SingleAccordion;
