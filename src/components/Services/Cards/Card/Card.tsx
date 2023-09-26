import servicesCards from "@/data/ServicesCards";
import { Box, Flex, Grid } from "@chakra-ui/react";
import Image from "next/image";
import TextContent from "./TextContent/TextContent";

interface CardsProps {
  id: number;
  title: string;
  description: string;
  image: any;
}

const Card = () => {
  return (
    <Box>
      <Grid
        gap={{ base: 14, md: 6 }}
        justifyItems="space-between"
        alignItems="space-between"
        textAlign={["center"]}
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
      >
        {servicesCards.map(({ id, title, description, image }: CardsProps) => (
          <Flex
            bg="primary.default"
            flexDirection="column"
            alignItems="space-between"
            justifyItems="space-between"
            flex={1}
            key={id}
            display={{ md: "grid" }}
            _hover={{
              transition: "transform .5s",
              border: "1px solid #584FF2",
              transform: "scale(105%)",
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            <Box
              position="relative"
              height={{ base: "14rem", md: "220" }}
              cursor="pointer"
            >
              <Image
                src={image}
                alt={title + " Image"}
                layout="fill"
                objectFit="cover"
              />
            </Box>
            <TextContent description={description} title={title} />
          </Flex>
        ))}
      </Grid>
    </Box>
  );
};

export default Card;
