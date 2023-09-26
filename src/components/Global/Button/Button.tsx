import { Button } from "@chakra-ui/react";
import Link from "next/link";

interface UIButtonInterface {
  link: string;
  bg?: string;
  children: string;
  hoverBg?: string;
  hoverBorder?: string;
  color?: string;
  borderColor?: string;
  hoverColor?: string;
  borderRadius?: number;
  transform?: string;
}

const UIButton = ({
  link,
  bg,
  children,
  hoverBg,
  hoverBorder,
  hoverColor,
  color = "#fff",
  borderRadius = 0,
  borderColor = "none",
  transform = `scale(105%)`,
}: UIButtonInterface) => {
  return (
    <Link href={link}>
      <Button
        colorScheme="teal"
        variant="outline"
        _hover={{
          bg: hoverBg,
          transition: "all .2s ease-in",
          color: hoverColor,
          transform: transform,
          border: hoverBorder,
        }}
        px={9}
        py={7}
        color={color}
        bg={bg}
        borderColor={borderColor}
        borderRadius={borderRadius}
        marginTop={{ base: "1.5rem", sm: -3 }}
      >
        {children}
      </Button>
    </Link>
  );
};

export default UIButton;
