import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Box
} from '@chakra-ui/react'

const steps = [
  { title: 'First', description: 'Basic Info' },
  { title: 'Second', description: 'User Details' },
  { title: 'Third', description: 'More Info.' },
  { title: 'Fourth', description: 'Availability Info.' },
]

export default function ProgressSteps({step}: {step: any}) {
  const { activeStep } = useSteps({
    index: +step,
    count: steps.length,
  })

  return (
    <Stepper size="lg" colorScheme="gray" index={activeStep} color="white" mb="2rem">
      {steps.map((step, index) => 
        <Step key={index} gap="1px">
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>

          <Box flexShrink="1">
            <StepTitle fontSize={["14px"]}>{step.title}</StepTitle>
            <StepDescription fontSize={["11px", "12px"]} color="white">{step.description}</StepDescription>
          </Box>

          <StepSeparator />
        </Step>
      )}
    </Stepper>
  );
}