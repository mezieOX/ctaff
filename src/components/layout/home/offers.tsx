import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { BsPerson, BsPeopleFill } from 'react-icons/bs';
import { FiServer } from 'react-icons/fi';
import { GoLocation } from 'react-icons/go';
// import { BsPeopleFill } from 'react-icons/bs';
import { FaPeopleCarry } from 'react-icons/fa';
import { MdAccessibility } from 'react-icons/md';
import { GiTeacher } from 'react-icons/gi';


interface StatsCardProps {
  title: string;
  stat: string;
  icon: ReactNode;
}
function StatsCard(props: StatsCardProps) {
  const { title, stat, icon } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={"5"}
      shadow={"xl"}
      border={"2px solid"}
        borderColor='#fff'
        backgroundColor="#000"
        mixBlendMode="difference"
        color=  "#fff"
      rounded={"lg"}
    >
      <Flex justifyContent={"space-between"}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={"medium"} fontSize={"md"} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={"auto"}
                color=  "#fff"
          alignContent={"center"}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

export default function Offers() {
  return (
    <Box
      maxW="7xl"
      mx={"auto"}
      pt={5}
      px={{ base: 2, sm: 12, md: 17 }}
      zIndex={5}
    >
      <chakra.h1
        textAlign={"center"}
        fontSize={"4xl"}
        py={10}
        fontWeight={"bold"}
        position="relative"
        zIndex={5}
        backgroundColor="#000"
        mixBlendMode="difference"
        color="#fff"
      >
        Our Services.
      </chakra.h1>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard
          title={"Render Jobs"}
          stat={"We help lots of individuals get their dream teaching jobs."}
          icon={<FaPeopleCarry size={"3em"} />}
        />
        <StatsCard
          title={"Teacher Search"}
          stat={
            "Ever wanted to get a specific teacher for your school or child or whatever? Then you're in the right place👍."
          }
          icon={<GiTeacher size={"3em"} />}
        />
        <StatsCard
          title={"Ease of access"}
          stat={"All of these is achievable in just a few clicks."}
          icon={<MdAccessibility size={"3em"} />}
        />
      </SimpleGrid>
    </Box>
  );
}