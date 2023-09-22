import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Box, Flex, Text } from "@chakra-ui/react";
import TestimonialImage from "./TestimonialImage/TestimonialImage";
import TextContent from "./TextContent/TextContent";
import testimonials from "@/data/Testimonials";

const Testimonial = () => {
  return (
    <Flex
      height={["auto", "auto", "auto"]}
      maxWidth="1200px"
      mx="auto"
      marginTop={{base: "6rem", sm: "8rem", md: "-2.3rem", lg: 0}}
      flexDirection="column"
      marginBottom={{base: 32, sm:40}}
    >
      <Box height={["auto", "auto", "auto"]}>
        <Box>
          <Box padding={6} mx="auto">
            <Text
              as="div"
              color="white"
              fontSize={["2rem", "3rem", "2.1rem"]}
              height={["300px", "270px", "250px"]}
              fontWeight={900}
              lineHeight="1.3"
              textAlign="center"
            >
              Users Testimonial
            </Text>
            <Flex
              width={["100%", "100%"]}
              justifyItems="space-between"
              marginTop={{base: "-10.5rem", sm:"-8.5rem"}}
              zIndex={-1}
            >
              <Swiper>
                {testimonials.map(({ id, image, title, name, description }) => (
                  <SwiperSlide key={id}>
                    <Flex marginTop={{base: "4rem", md: "0"}} flexDirection="column" alignItems="center" justifyContent="space-between">
                      <TestimonialImage image={image} />
                      <TextContent
                        title={title}
                        name={name}
                        description={description}
                      />
                    </Flex>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default Testimonial;
