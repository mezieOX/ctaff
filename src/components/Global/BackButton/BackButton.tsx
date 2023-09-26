import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const BackButton = ({
  top,
  right,
  bottom,
  left,
}: {
  top?: number;
  right?: object | number;
  bottom?: number;
  left?: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <Button
      size="md"
      height="48px"
      width="200px"
      w="max"
      onClick={scrollToTop}
      style={{ display: isVisible ? "block" : "none" }}
      position="fixed"
      top={top}
      right={right}
      left={left}
      bottom={bottom}
      zIndex={10}
      color="white"
      bg="primary.default"
      _hover={{ transform: "scale(105%)", transition: "all .2s ease-in" }}
    >
      Top
    </Button>
  );
};

export default BackButton;
