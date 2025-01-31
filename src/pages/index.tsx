import { siteTitle } from "@/config/siteTitle";
import Head from "next/head";
import Navbar from "@/components/layout/navbar/Navbar";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  AccordionSection,
  Categories,
  GetStartedSection,
  ServicesSection,
  Testimonial,
} from "@/components/layout/Home";
import { Footer } from "@/components/layout/Footer";
import BackButton from "@/components/Global/BackButton/BackButton";

export default function Home() {
  // useEffect(() => {
  //   console.log("process.env.NEXT_PUBLIC_API_URL", process.env.NEXT_PUBLIC_API_URL)
  //   console.log("TYPE process.env.NEXT_PUBLIC_API_URL", typeof process.env.NEXT_PUBLIC_API_URL)
  //   console.log("process.env.API_URLL", process.env.API_URL)
  //   console.log("TYPE process.env.API_URL", typeof process.env.API_URL)
  //   console.log("hello")
  // }, [])
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <motion.div
          key="my-page"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Box bg="#F0F2F5" minH="100vh">
            <Navbar />
            <GetStartedSection />
            <Categories />
            <ServicesSection />
            <AccordionSection />
            <Testimonial />
            <Footer />
            <BackButton bottom={12} right={{ base: 9, sm: 6 }} />
          </Box>
        </motion.div>
      </>
    </>
  );
}
