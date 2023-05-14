import { Box } from '@chakra-ui/react';
import { InfinitySpin } from 'react-loader-spinner';



const Loader = () => {
    return (
      <Box
        position="fixed"
        display="flex"
        alignItems="center"
        justifyContent="center"
        zIndex="1000"
        backgroundColor="#0d0d0e"
        width="100%"
        height="100%"
      >
        <InfinitySpin width="200" color="#fff" />
      </Box>
    );
}
 
export default Loader;

