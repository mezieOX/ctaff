import { Box } from "@chakra-ui/react";
import Image from "next/image";

const AchievementImage = () => {
  return (
    <Box
      width={{ base: "100%", xl: "80%" }}
      maxWidth={{ base: "100%", md: "50%" }}
      marginLeft={{ xl: "auto" }}
      marginTop={{ base: "2rem", sm: "1rem", md: "0" }}
    >
      <Image
        src="/images/about achievements.svg"
        alt="Home Image"
        width={600}
        height={600}
      />
    </Box>
  );
};

export default AchievementImage;
