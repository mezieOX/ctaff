import React from 'react';
import { ListItem, Box, Text, Flex, Image } from '@chakra-ui/react';

interface OtherCertificationsPropsInterface {
  certificate: string;
  description?: string;
  handlePreviewCertificationModal: any;
  checkIfDocument: any;
}

const OtherCertifications = ({ certificate, description, handlePreviewCertificationModal, checkIfDocument}: OtherCertificationsPropsInterface) => {
  return (
    <ListItem>
      <Box display="flex" flexDir="column" gap=".5rem">
        <Text fontWeight="700">Certificate:</Text>
        <Box
            objectFit="contain"
            cursor="pointer"
            w={{ base: "100%", md: "30%", lg: "10%" }}
            // w="100%"
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
      {<Box display="flex" gap=".5rem" alignItems="center">
        <Text fontWeight="700">Description:</Text>
        {description}
      </Box>}
    </ListItem>
  );
};

export default OtherCertifications;
