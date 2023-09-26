import { UIButton } from "@/components/Global";
import servicesSectionCards from "@/data/ServiceSectionCard";
import { theme } from "@/utils/chakratheme";
import { Box, Flex, Text, Button, Stack, Grid } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

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
        {servicesSectionCards.map(
          ({ id, title, description, image }: CardsProps) => (
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
                height={{ base: "14rem", md: "230" }}
                cursor="pointer"
              >
                <Image
                  src={image}
                  alt={title + " Image"}
                  layout="fill"
                  objectFit="cover"
                />
              </Box>
              <Flex
                flexDirection="column"
                bg="primary.default"
                alignItems="space-between"
                justifyItems="space-between"
                color={theme.colors.white}
                flex={1}
                _hover={{
                  bg: "white",
                  transition: "background .5s",
                  color: theme.colors.black,
                  borderBottom: "1px solid #37254b",
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                }}
              >
                <Text
                  fontSize={{ base: "1.2rem", md: "1.2rem" }}
                  fontWeight={900}
                  marginTop={3}
                  textAlign="center"
                  padding={6}
                >
                  {title}
                </Text>
                <Text
                  marginTop={{ base: -7, md: -8 }}
                  marginBottom={{ base: "-.9rem", sm: "1.5rem", md: ".4rem" }}
                  fontSize={{ base: "1rem", md: ".9rem" }}
                  textAlign="center"
                  paddingY={6}
                  maxWidth={{ base: "80%", md: "88%" }}
                  mx="auto"
                  flex={1}
                >
                  {description}
                </Text>
                <Stack
                  align="center"
                  display="flex"
                  justifyItems="end"
                  marginBottom={10}
                >
                  <UIButton
                    link="/about"
                    bg="warning.default"
                    borderColor="transparent"
                    borderRadius={4}
                    transform="scale(105%)"
                  >
                    Learn More
                  </UIButton>
                </Stack>
              </Flex>
            </Flex>
          )
        )}
      </Grid>
    </Box>
  );
};

export default Card;
