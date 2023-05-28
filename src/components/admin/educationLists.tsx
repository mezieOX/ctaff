import React from 'react';
import { ListItem, Box, Text, Flex, Image } from '@chakra-ui/react';

interface EducationPropsInterface {
  edutype: string;
  school: string;
  city: string;
  certificate: string;
  period: string;
  handlePreviewCertificationModal: any;
  checkIfDocument: any
}

const Education = ({ edutype, school, city, certificate, period, handlePreviewCertificationModal , checkIfDocument}: EducationPropsInterface) => {
  return (
    <ListItem>
      <Box display="flex" gap=".5rem" alignItems="center">
        <Text fontWeight="700">Edu type:</Text>
        {edutype}
      </Box>
      <Box display="flex" gap=".5rem" alignItems="center">
        <Text fontWeight="700">School:</Text>
        {school}
      </Box>
      <Box display="flex" gap=".5rem" alignItems="center">
        <Text fontWeight="700">City:</Text>
        {city}
      </Box>
      <Box display="flex" flexDir="column" gap=".5rem">
        <Text fontWeight="700">Certificate:</Text>
        <Box
            objectFit="contain"
            cursor="pointer"
            w={{ base: "100%", md: "30%", lg: "10%" }}
            h="10rem"
            rounded="lg"
            overflow="hidden"
            onClick={() => handlePreviewCertificationModal(certificate)}
        >
            {!checkIfDocument(certificate)? <Image
                width="100%"
                height="100%"
                src={certificate}
                alt="teacher"
                />: 
                <Flex 
                alignItems="center"
                justifyContent="center"
                bg="gray"
                color="#fff"
                width="100%"
                height="100%"
                >
                File
                </Flex>
            }
        </Box>
      </Box>

      <Box display="flex" gap=".5rem" alignItems="center">
        <Text fontWeight="700">Period:</Text>
        {period}
      </Box>
    </ListItem>
  );
};

export default Education;
