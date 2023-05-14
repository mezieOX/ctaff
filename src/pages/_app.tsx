import "@/styles/globals.css";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../../src/utils/chakratheme";
import Loader from "@/components/layout/loader";
import ReusabaleLayout from "@/components/reusableLayout";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const handleRouteChange = (url: any) => {
      setLoading(true);
    };

    const handleRouteChangeComplete = () => {
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router.events]);

  //  <>{loading ? <Loader /> : <Component {...pageProps} />}</>
  return (
    //   <ChakraProvider theme={theme}>
    //      <AnimatePresence mode='wait'>
    //         <Component {...pageProps} />
    //      </AnimatePresence>
    // </ChakraProvider>
    loading ? (
      <Loader />
    ) : (
      <ChakraProvider theme={theme}>
        <AnimatePresence mode="wait">
          <ReusabaleLayout>
            <Component {...pageProps} />
          </ReusabaleLayout>
        </AnimatePresence>
      </ChakraProvider>
    )
  );
}
