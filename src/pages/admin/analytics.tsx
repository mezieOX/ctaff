import {
  Box,
  Heading,
  SimpleGrid,
  Flex,
  Text,
  Button,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import {useRouter} from "next/router"
import AdminNav from "@/components/admin/nav";
import BackButton from "@/components/layout/dashboardBackButton"
import { CheckCircleIcon, ChevronLeftIcon } from '@chakra-ui/icons'

const Analytics = () => {
  const [progressValue, setProgressValue] = useState(0);


  useEffect(() => {
    const timer = setTimeout(() => {
        setStatData([
            {name: "Registered Schools", stat: 10},
            {name: "Registered Teachers", stat: 70},
            {name: "Registered Users", stat: 40},
        ]);
    }, 1000)

    return () => {
        clearTimeout(timer)
    }
  }, []);

  const colorByScore = (progressValue: number) => {
    return progressValue < 40 ? "red" : progressValue < 70 ? "yellow" : "green"
  }

  const [statData, setStatData] = useState([
    {name: "Registered Schools", stat: 0},
    {name: "Registered Teachers", stat: 0},
    {name: "Registered Users", stat: 0},
  ])

  return (
    <Box position="relative">
      <AdminNav />
      <Box
        // shadow="1px 3px 16px 4px rgba(1,1,1,0.1);"
        minHeight="100vh"
        mx="auto"
        my="4rem"
        w="80%"
      >
        <BackButton/>
        <Heading>
            Total users: 120
        </Heading>
        <Box mt="5rem">
            <SimpleGrid columns={{base: 1, md:3}} spacing="2rem">
                {statData.map((data, index) => (
                    <Flex flexDir="column" key={index} alignItems="center">
                        <CircularProgress
                            display="flex"
                            flexDir="column"
                            alignItems="center"
                            size="120px"
                            transition=".6s"
                            value={data.stat}
                            color={
                                colorByScore(data.stat)
                            }
                            trackColor="gray.300"
                            thickness="15px"
                            capIsRound
                        >
                            <CircularProgressLabel>
                                {data.stat ? (
                                `${data.stat}%`
                                ) : (
                                <CircularProgress size="30px" isIndeterminate pr={2} />
                                )}
                            </CircularProgressLabel>
                        </CircularProgress>
                        <Text as="h3">{data.name}</Text>
                    </Flex>
                ))}
            </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
};

export default Analytics;
