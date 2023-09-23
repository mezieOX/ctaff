import { useRouter } from "next/router";
import { Box, Select, Menu, MenuItem, useMediaQuery } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/navbar/Navbar";

const WhoAmI = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const router = useRouter();

  const [isLessThan1042] = useMediaQuery("(max-width: 1042px)");
  const [isLessThan700] = useMediaQuery("(max-width: 700px)");

  let width = isLessThan1042 ? "90%" : "40%";
  // if(isLessThan1042)
  //     width = "60%"
  // else if(isLessThan700)
  //     width = "80%"
  // else
  //     width = "40%"

  const animateFloat1 = keyframes`
                    0%, 100% {
                        transform: translateY(500px);
                    }
                    50% {
                        transform: translateY(0);
                    }
                    `;

  const animateFloat2 = keyframes`
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-500px);
                    }`;

  const handleOptionChange = (e: any) => {
    let val = e.target.value;
    if (val === "applicant")
      router.push("/verifyemail/register/teacher/inputemail");
    else if (val === "individual") router.push("/signup/teacher_finder");
    else router.push("/signup/school");
    // console.log(e.target.value);
    // setSelectedOption(e.target.value);
  };

  return (
    <motion.div
      key="who_am_i"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 1 }}
    >
      <Box position="relative" bg="black" height="100vh" width="100%">
        {/* <Box
          display={{ base: "none", md: "inline" }}
          position="absolute"
          width="30%"
          height={{ base: "30%", md: "30%" }}
          top="40px"
          left={{ base: "45px", md: "40px" }}
          background={{
            base: "linear-gradient(#e91e63, #2196f3)",
            md: "linear-gradient(#f0f, #f00)",
          }}
          clipPath={{
            base: "circle(16% at 70% 65%)",
            md: "circle(16% at 25% 30%)",
          }}
          animation={`${animateFloat1} 5s infinite ease-in-out`}
          // zIndex={5}
        /> */}
        <Navbar/>
        <Box paddingTop="10rem" zIndex={10}>

          <select
            style={{
              backgroundColor: "#37254b",
              color: "#fff",
              width,
              marginTop: "3rem",
              padding: "1rem",
              display: "grid",
              textAlign: "left",
              placeItems: "center",
              textIndent: "1rem",
              margin: "auto",
              border: "none",
              borderRadius: "5px",
              zIndex: 10,
            }}
            onChange={handleOptionChange}
            value={selectedOption}
          >
            <option
              disabled
              defaultValue="I am"
              value=""
              style={{ color: "#fff", backgroundColor: "black" }}
            >
              -- &nbsp; I am ....&nbsp;--
            </option>
            <option
              style={{ color: "#fff", backgroundColor: "black" }}
              value="applicant"
            >
              An Applicant for the role of a cover teacher
            </option>
            <option
              style={{ color: "#fff", backgroundColor: "black" }}
              value="individual"
            >
              A parent/individual who is in need of a private teacher
            </option>
            <option
              style={{ color: "#fff", backgroundColor: "black" }}
              value="school"
            >
              A Principal/Headmaster/Headmistress/Proprietor searching for a
              cover teacher for my school
            </option>
          </select>
        </Box>
        {/* <Box
          position="absolute"
          display={{ base: "none", md: "inline" }}
          width="30%"
          height={{ base: "30%", md: "30%" }}
          bottom="60px"
          right={{ base: "70px", md: "80px" }}
          background={{
            base: "linear-gradient(#f0f, #f00)",
            md: "linear-gradient(#e91e63, #2196f3)",
          }}
          clipPath={{
            base: "circle(16% at 25% 30%)",
            md: "circle(16% at 70% 65%)",
          }}
          animation={`${animateFloat2} 9s infinite ease-in-out`}
          zIndex={0}
        /> */}
      </Box>
    </motion.div>
  );
};

export default WhoAmI;
