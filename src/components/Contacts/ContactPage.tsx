import { Box, Grid } from "@chakra-ui/react";
import Card from "./Card/Card";
import Form from "./Form/Form";

const ContactPage = () => {
  return (
    <Box
      backgroundColor="#37254b"
      flexDirection={{ base: "column", md: "row" }}
      marginTop={{ base: "2rem", xl: "8rem" }}
      gap={{ base: "1rem", xl: "3rem" }}
      padding={{ base: 2, sm: 6 }}
      marginBottom={{ base: "12rem", xl: "15rem" }}
      maxWidth="1140px"
      mx={{ base: "2rem", xl: "auto" }}
      borderRadius={6}
      position="relative"
    >
      <Grid
        marginBottom={{ base: "0", xl: "2rem" }}
        marginTop={{ base: "0", xl: "3rem" }}
        mx={{ base: "0", xl: "3rem" }}
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          xl: "repeat(1, 1fr)",
        }}
        justifyItems={{ base: "start", xl: "end" }}
        gap={{ base: 0, md: "2rem", xl: "0" }}
      >
        <Card />
        <Form />
      </Grid>
    </Box>
  );
};

export default ContactPage;
