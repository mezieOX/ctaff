import { Flex, Text, UnorderedList, ListItem } from "@chakra-ui/react";

interface UnorderedListsPropsInterface {
  name: string;
  data: any[];
  type?: string;
}

const UnorderedLists = ({ name, data, type }: UnorderedListsPropsInterface) => {
  return (
    <Flex flexDir="column" mt="2rem">
      <Text
        fontWeight="700"
        fontSize={{ base: "17px", md: "1.5rem" }}
        textDecor="underline"
      >
        {name}
      </Text>
      {data.length > 0 ? (
        <UnorderedList>
          {data?.map((item: any, i) =>
            type == "lang" ? (
              <ListItem key={i}>
                {item.languageType} - {item.fluency || 0}%
              </ListItem>
            ) : type == "skill" ? (
              <ListItem key={i}>
                {item.skillType} - {item.skillLevel || 0}%
              </ListItem>
            ) : type == "availDays" ? (
              <ListItem key={i}>
                {item.day} - ({item.am && "am"}
                {item.am && item.pm && " & "}
                {item.pm && "pm"})
              </ListItem>
            ) : (
              <ListItem key={i}>{item}</ListItem>
            )
            // type == "teachSubjs"?
          )}
        </UnorderedList>
      ) : (
        <Text>none</Text>
      )}
    </Flex>
  );
};

export default UnorderedLists;
