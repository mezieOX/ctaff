import ContactPage from "@/components/Contacts/ContactPage";
import { BackButton } from "@/components/Global";
import { Footer } from "@/components/layout/Footer";
import Navbar from "@/components/layout/navbar/Navbar";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <motion.div
      key="my-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Box bg="#1b1222" minH="100vh">
        <Navbar />
        <ContactPage />
        <Footer />
        <BackButton bottom={12} right={12} />
      </Box>
    </motion.div>
  );
};

export default Contact;
