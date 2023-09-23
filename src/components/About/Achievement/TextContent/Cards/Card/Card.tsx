import { Box, Flex, Text, Grid, GridItem, Icon } from "@chakra-ui/react";
import achievementCards from "@/data/AboutAchievementCards";

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
          xl: "repeat(2, 1fr)",
        }}
        gap={{ base: 4, md: 5, lg: 5, xl: 4 }}
        flexDirection="column"
        alignItems={["center", "flex-start"]}
        textAlign={["center", "left"]}
        marginBottom={{ base: "2rem", md: "1rem", lg: "0" }}
        marginTop={{ base: 10, sm: 0 }}
      >
        {achievementCards.map(
          ({ id, title, description, bc, symbol }: CardsProps) => (
            <GridItem
              bg="#5A449F"
              borderRadius={15}
              padding={5}
              textAlign="center"
              key={id}
              _hover={{
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 80px 0 rgba(0, 0, 0, 0.19)",
              }}
            >
              <Flex
                bg={bc}
                borderRadius={20}
                marginTop={2}
                w={14}
                padding={{ base: 2, md: 2 }}
                alignItems={{ base: "center" }}
                h={{ base: 14, md: "5rem" }}
                position="relative"
                mx="auto"
              >
                <Icon
                  color="white"
                  mx="auto"
                  my="auto"
                  position="absolute"
                  top={{ base: -1, md: 4 }}
                  right=".6rem"
                  transform={{
                    base: "translate(-10%, 50%)",
                    md: "translate(-8%, 20%)",
                  }}
                  as={symbol}
                  className="fill-current"
                  w={8}
                  h={8}
                />
              </Flex>
              <Text
                as="div"
                color="white"
                fontSize={{ base: "1rem", lg: "1.5rem" }}
                fontWeight={900}
                marginTop={{ base: 8, md: 7 }}
              >
                {title}
              </Text>
              <Text
                as="div"
                marginTop={{ base: 4, md: 3 }}
                marginBottom=".7rem"
                color="white"
                fontSize={{ sm: "1rem", md: "1rem" }}
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
