import { useRouter } from "next/router";
import React, { useState, useEffect, useLayoutEffect } from "react";
import Loader from "@/components/layout/loader";

import {
  Progress,
  Box,
  useToast,
  useMediaQuery
} from "@chakra-ui/react";
import Form1 from "@/components/form/multistepForms/form1";
import Form2 from "@/components/form/multistepForms/form2";
import Form3 from "@/components/form/multistepForms/form3";
import Form4 from "@/components/form/multistepForms/form4";
import ProgressSteps from "@/components/form/multistepForms/progressSteps";
import FormCompleted from "@/components/form/multistepForms/formCompleted";
import axios from "axios";

interface MultiStepInterface {
  step: any ;
  progressLevel: number;
  runConfetti: boolean;
  data: any
}

export default function Multistep({ step, progressLevel, runConfetti, data }: MultiStepInterface) {
  const toast = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showloadingring, setShowloadingring] = useState(false);
  const [isLessthan500] = useMediaQuery('(min-width: 500px)');
  let url = process.env.NEXT_PUBLIC_API_URL;
  

  // const [step, setStep] = useState(2);
  // const [progress, setProgress] = useState(progressLevel);

  // : {step: string, token: string}
  const { token } = router.query;
  async function handleTeacherFormSubmit(data: any) {
    setShowloadingring(true);
    console.log(data)
    let nextStep = +step + 1;
    
    try{
      if(step == 4){
        // const sendForm = await axios.post(`${url}/users/addTeacherDetails`, 
        const sendForm = await axios.post('/api/addTeacherDetails', 
        {...data, step, token}
        )
      }else{
        data.append("step", step)
        data.append("token", token)
        const sendForm = await axios.post(`${url}/users/addTeacherDetails`, 
          // const sendForm = await axios.post('/api/addTeacherDetails', 
          data
          )
      }
      setShowloadingring(false);
      setLoading(true);
      router.push(`/register/${nextStep}/${token}`)
        
    }catch(err: any){
      if (err.response?.status == 400) {
        setShowloadingring(false);
        toast({
          title: "Invalid Passwords!",
          position: "top",
          variant: "left-accent",
          status: "error",
          duration: 10000,
          isClosable: true,
        });
      }else if(err.response?.status == 401){
        setShowloadingring(false);
        router.push('/404')
      }else {
        setShowloadingring(false);
        console.log(err);
        toast({
          title:
            "An error occured. Please check internet connection",
          position: "top",
          variant: "left-accent",
          status: "error",
          duration: 10000,
          isClosable: true,
        });
      }

    }
  }

  useEffect(() => {
    setLoading(false);
    if(step == 5){
      (async() => {
        // const data = await axios.post(`${url}/users/disableConfetti`, {
        const data = await axios.post('/api/disableConfetti', {
          token,
        });
      })()
    }
  }, [step, url, token])

  if (loading) {
    return <Loader />;
  }

  return (
    <Box minH="100vh" py="5rem" bg="#37254b">
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 3px 16px 17px rgba(0,0,0,0.3);"
        maxWidth={800}
        bg="#purple"
        p={6}
        mx={["auto"]}
        // as="form"
      >
        {step != 5 && <Progress
          // hasStripe
          colorScheme="purple"
          rounded="lg"
          transition=".7s"
          value={progressLevel}
          mb="5%"
          mx="5%"
          isAnimated
        ></Progress>}
        {isLessthan500 && <ProgressSteps step={step}/>}
        {step == 1 ? (
          <Form1 handleTeacherFormSubmit={handleTeacherFormSubmit} email={data.email} showloadingring={showloadingring}/>
        ) : step == 2 ? (
          <Form2 handleTeacherFormSubmit={handleTeacherFormSubmit}  showloadingring={showloadingring}/>
        ) : step == 3 ? (
          <Form3 handleTeacherFormSubmit={handleTeacherFormSubmit}  showloadingring={showloadingring}/>
        ):  step == 4 ?  (
          <Form4 handleTeacherFormSubmit={handleTeacherFormSubmit} showloadingring={showloadingring}/>
        ): (<FormCompleted runConfetti={runConfetti}/> )
        }
      </Box>
    </Box>
  );
}

export async function getServerSideProps(context: any) {
  const { params } = context;
  const url = process.env.API_URL;
  const { step, token } = params;
  let progressLevel;
  let tokenData = ""

  if (!Number.isInteger(Number(step)) || Number(step) > 5 || Number(step) < 1) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

    let runConfetti = true

    try {
      const {data} = await axios.post(`${url}/users/isValidToken`, {
        token,
      });
      tokenData = data
        runConfetti = !data.confettiShown
          // return { registrationStep: user.teacher?.registrationLevel ?? 1, token: jwtToken }
      if(data.registrationStep != step ){
          return {
          redirect: {
            destination: `/register/${data.registrationStep}/${token}`,
            permanent: false,
          },
        };
      }

    } catch (err: any) {
      if (err.response?.status == 401) {
        return {
          redirect: {
            destination: "/404",
            permanent: false,
          },
        };
      }
    }

  if(step == 1)
    progressLevel = 25
  else if(step == 2)
    progressLevel = 50
  else if(step == 3)
    progressLevel = 75
  else
    progressLevel = 100

  return {
    props: {
      step,
      progressLevel,
      runConfetti,
      data: tokenData
    },
  };
}
