import { Box } from "@chakra-ui/react";
import React from "react";
import Card from "./Card/Card";

const Cards = () => {
  return (
    <Box flex={1} position={{ base: "relative", lg: "absolute" }}>
      <Card />
    </Box>
  );
};

export default Cards;
