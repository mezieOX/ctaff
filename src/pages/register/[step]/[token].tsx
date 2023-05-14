import { useRouter } from "next/router";
import React, { useState, useEffect, useLayoutEffect } from "react";
import Loader from "@/components/layout/loader";

import {
  Progress,
  Box,
  useToast,
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
}

export default function Multistep({ step, progressLevel, runConfetti }: MultiStepInterface) {
  const toast = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // const [step, setStep] = useState(2);
  // const [progress, setProgress] = useState(progressLevel);

  // : {step: string, token: string}
  // const { step, token } = router.query;
  function handleTeacherFormSubmit(data: any) {
    setLoading(true);
    let nextStep = +step + 1;
    router.push(`/register/${nextStep}/njdjikd`)
    console.log(data);
  }
  useEffect(() => {
    setLoading(false);
  }, [])

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
        <ProgressSteps/>
        {step == 1 ? (
          <Form1 handleTeacherFormSubmit={handleTeacherFormSubmit} />
        ) : step == 2 ? (
          <Form2 handleTeacherFormSubmit={handleTeacherFormSubmit} />
        ) : step == 3 ? (
          <Form3 handleTeacherFormSubmit={handleTeacherFormSubmit} />
        ):  step == 4 ?  (
          <Form4 handleTeacherFormSubmit={handleTeacherFormSubmit}/>
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

  if (!Number.isInteger(Number(step)) || Number(step) > 5 || Number(step) < 1) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

    try {
      const res = await axios.post(`${url}/users/isValidToken`, {
        token,
      });
    } catch (err: any) {
      if (err.response.status == 401) {
        return {
          redirect: {
            destination: "/404",
            permanent: false,
          },
        };
      }
    }


  let runConfetti = true

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
      runConfetti
    },
  };
}
