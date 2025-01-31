import { Box } from "@chakra-ui/react";
import Image from "next/image";

const GetStartedImage = () => {
  return (
    <Box
      width={["100%", "100%"]}
      maxWidth={{ base: "100%", md: "50%" }}
      marginLeft={{ base: "auto" }}
      marginTop={{ base: "2rem", sm: "1rem", md: "0" }}
    >
      <Image
        src="/images/header.svg"
        alt="Home Image"
        width={600}
        height={600}
      />
    </Box>
  );
};

export default GetStartedImage;
