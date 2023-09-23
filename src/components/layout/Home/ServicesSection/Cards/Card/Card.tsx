import servicesSectionCards from "@/data/ServiceSectionCard";
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
              flexDirection="column"
              alignItems="space-between"
              justifyItems="space-between"
              flex={1}
              key={id}
              display={{ md: "grid" }}
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
              <Flex
                flexDirection="column"
                backgroundColor="#37254b"
                alignItems="space-between"
                justifyItems="space-between"
                flex={1}
                _hover={{
                  bg: "transparent",
                  transition: "background .5s",
                  borderX: "1px solid #37254b",
                  borderBottom: "1px solid #37254b",
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                }}
              >
                <Text
                  as="div"
                  color="white"
                  fontSize={{ base: "1.2rem", md: "1.2rem" }}
                  fontWeight={900}
                  marginTop={3}
                  textAlign="center"
                  padding={6}
                >
                  {title}
                </Text>
                <Text
                  as="div"
                  marginTop={{ base: -7, md: -8 }}
                  marginBottom=".4rem"
                  color="white"
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
                  <Link href="/about">
                    <Button
                      colorScheme="teal"
                      variant="outline"
                      _hover={{ bg: "red.600", transition: "all .2s ease-in" }}
                      px={9}
                      py={7}
                      color="white"
                      bg="red.500"
                      border="none"
                      borderRadius={12}
                      marginTop={{ base: 1, md: -3 }}
                    >
                      Learn More
                    </Button>
                  </Link>
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
