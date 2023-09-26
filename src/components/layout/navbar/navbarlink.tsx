import { keyframes } from "@emotion/react";
import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { theme } from "@/utils/chakratheme";

interface NavbarlinkProps {
  to: string;
  linkName: string;
  scroll?: boolean;
  baseScroll?: boolean;
}

export const animateUnderline = keyframes`
0% {
    transform: scaleX(0);
    transform-origin: center;
}
100% {
    transform: scaleX(1);
    transform-origin: center;
}
`;
const NavBarLink = ({ to, linkName, scroll, baseScroll }: NavbarlinkProps) => {
  const router = useRouter();

  return (
    <Link href={to} shallow>
      <Button
        marginLeft="2rem"
        textDecoration="none"
        // as="a"
        variant="none"
        p={{ base: 2, md: 4 }}
        fontSize={"md"}
        // textDecoration="underline"
        color={
          scroll
            ? theme.colors.white
            : theme.colors.primary.default || (baseScroll && theme.colors.white)
        }
        position="relative"
        _before={
          router.pathname === to
            ? {
                content: "''",
                position: "absolute",
                bottom: "-5px",
                width: "100%",
                height: "2px",
                bg: scroll ? theme.colors.white : theme.colors.primary.default,
                animation: `${animateUnderline} 0.3s forwards`,
                transition:
                  "opacity 0.3s ease-out, transform 0.3s ease-out, visibility 0s 0.3s",
              }
            : undefined
        }
        _hover={{
          color: theme.colors.warning.default,
          _before: {
            content: "''",
            position: "absolute",
            bottom: "-5px",
            width: "100%",
            height: "2px",
            bg: theme.colors.warning.default,
            animation: `${animateUnderline} 0.3s forwards`,
            transition:
              "opacity 0.3s ease-out, transform 0.3s ease-out, visibility 0s 0.3s",
          },
        }}
      >
        {linkName}
      </Button>
    </Link>
  );
};

export default NavBarLink;
