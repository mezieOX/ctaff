import { Box, Flex, Text, Grid, GridItem, Icon } from "@chakra-ui/react";
import categoriesCards from "@/data/CategoriesCards";

interface CardsProps {
  id: number;
  title: string;
  description: string;
  bc: string;
  symbol: any;
}

const Card = () => {
  return (
    <Box>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(2, 1fr)",
          xl: "repeat(3, 1fr)",
        }}
        gap={{ base: 4, md: 5, lg: 5, xl: 4 }}
        flexDirection="column"
        alignItems={["center", "flex-start"]}
        textAlign={["center", "left"]}
        marginTop={["1px", "1px", "2rem", "3rem", "5rem"]}
        marginBottom={{ base: "2rem", md: "1rem", lg: "0" }}
      >
        {categoriesCards.map(
          ({ id, title, description, bc, symbol }: CardsProps) => (
            <GridItem
              bg="#5A449F"
              borderRadius={15}
              padding={6}
              minHeight={{base: "19rem", sm: "21.8rem", md: 230 }}
              key={id}
              _hover={{
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 80px 0 rgba(0, 0, 0, 0.19)",
              }}
            >
              <Flex
                bg={bc}
                rounded={10}
                marginTop={-1}
                w={10}
                padding={{ base: 2, md: 2 }}
                alignItems={{ base: "center" }}
                h={{ base: 14, md: 10 }}
                position="relative"
              >
                <Icon
                  color="white"
                  mx="auto"
                  my="auto"
                  position="absolute"
                  top={0}
                  transform={{
                    base: "translate(-10%, 50%)",
                    md: "translate(-8%, 20%)",
                  }}
                  as={symbol}
                  className="fill-current"
                  w={7}
                  h={7}
                />
              </Flex>
              <Text
                as="div"
                color="white"
                fontSize={{ base: "1rem", lg: "1rem" }}
                fontWeight={900}
                marginTop={{ base: 8, md: 4 }}
              >
                {title}
              </Text>
              <Text
                as="div"
                marginTop={{ base: 4, md: 2 }}
                marginBottom=".4rem"
                color="white"
                fontSize={{ sm: "1rem", md: ".8rem" }}
              >
                {description}
              </Text>
            </GridItem>
          )
        )}
      </Grid>
    </Box>
  );
};

export default Card;
