import aboutCards from "@/data/AboutCard";
import { Box, Flex, Grid } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import MediaIcon from "./MediaIcons/MediaIcon";
import TextContent from "./TextContent/TextContent";

interface CardsProps {
  id: number;
  title: string;
  name: string;
  image: any;
}

const Card = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleCardHover = (cardId: number) => {
    setHoveredCard(cardId);
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };
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
          xl: "repeat(4, 1fr)",
        }}
        width="full"
        borderRadius={20}
        position="relative"
      >
        {aboutCards.map(({ id, title, name, image }: CardsProps) => (
          <Flex
            flexDirection="column"
            alignItems="space-between"
            justifyItems="space-between"
            flex={1}
            key={id}
            position="relative"
            onMouseEnter={() => handleCardHover(id)}
            onMouseLeave={handleCardLeave}
          >
            <Flex
              flexDirection="column"
              backgroundColor="#37254b"
              alignItems="space-between"
              justifyItems="space-between"
              px={8}
              borderRadius={20}
              border="1px solid #584FF2"
              _hover={{
                bg: "transparent",
                transition: "background .5s",
                borderX: "1px solid #37254b",
                border: "1px solid #37254b",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              }}
            >
              <Box
                position="relative"
                rounded={5}
                height={{ base: "14rem", md: "220" }}
                cursor="pointer"
                overflow="hidden"
                marginTop={8}
                paddingTop={2}
              >
                <Box
                  position="relative"
                  width="200"
                  height="250"
                  top="0"
                  bottom="0"
                  marginTop={-4}
                >
                  <Image
                    src={image}
                    alt={title + " Image"}
                    layout="fill"
                    objectFit="cover"
                  />
                </Box>
              </Box>
              <TextContent name={name} title={title} />
              <div
                style={{
                  opacity: hoveredCard === id ? 1 : 0,
                  transition: "opacity 0.5s ease-in-out",
                  cursor: "pointer",
                }}
              >
                <MediaIcon />
              </div>
            </Flex>
          </Flex>
        ))}
      </Grid>
    </Box>
  );
};

export default Card;
