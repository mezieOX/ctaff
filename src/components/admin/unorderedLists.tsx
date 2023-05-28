import React from 'react';
import {
  Flex,
  Text,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

interface UnorderedListsPropsInterface {
  name: string;
  data: string[];
}

const UnorderedLists = ({ name, data }: UnorderedListsPropsInterface) => {
  return (
    <Flex flexDir="column" mt="2rem">
    <Text
        fontWeight="700"
        fontSize={{ base: "17px", md: "1.5rem" }}
        textDecor="underline"
    >
        {name}
    </Text>
    <UnorderedList>
        {data?.map((item, index) => (
            <ListItem key={index}>{item}</ListItem>
        ))}
    </UnorderedList>
    </Flex>
  );
};

export default UnorderedLists;
