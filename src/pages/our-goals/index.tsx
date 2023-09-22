import { Footer } from "@/components/layout/Footer";
import { Goals } from "@/components/layout/Home";
import Navbar from "@/components/layout/navbar/Navbar";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

const GoalsPage = () => {
  return (
    <motion.div
      key="login"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box bg="#1b1222" minH="100vh">
        <Navbar />
        <Box marginTop={{ base: -60, md: -40, lg: "-28rem" }}>
          <Goals goals="" />
        </Box>
        <Footer />
      </Box>
    </motion.div>
  );
};

export default GoalsPage;
