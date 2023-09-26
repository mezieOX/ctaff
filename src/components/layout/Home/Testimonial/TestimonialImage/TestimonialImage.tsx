import { Box } from "@chakra-ui/react";
import Image from "next/image";

const TestimonialImage = ({ image }: { image: string }) => {
  return (
    <Box
      bg="success.default"
      borderRadius={50}
      padding={4}
      boxShadow={
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 80px 0 rgba(0, 0, 0, 0.19)"
      }
    >
      <Box
        position="relative"
        height={16}
        width={16}
        borderRadius={50}
        overflow="hidden"
        padding={3.5}
        borderColor="transparent"
      >
        <Image src={image} layout="fill" objectFit="cover" alt="testimonial" />
      </Box>
    </Box>
  );
};

export default TestimonialImage;
