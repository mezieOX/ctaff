import { About } from "@/components/About";
import { BackButton } from "@/components/Global";
import { Footer } from "@/components/layout/Footer";
import Navbar from "@/components/layout/navbar/Navbar";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

const AboutPage = () => {
  return (
    <motion.div
      key="login"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box bg="#1b1222" minH="100vh">
        <Navbar />
        <About />
        <Footer />
        <BackButton bottom={12} right={{ base: 9, sm: 6 }} />
      </Box>
    </motion.div>
  );
};

export default AboutPage;
