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
  { title: 'Second', description: 'Date & Time' },
  { title: 'Third', description: 'Select Rooms' },
  { title: 'Fourth', description: 'Availability Info.' },
]

export default function ProgressSteps() {
  const { activeStep } = useSteps({
    index: 1,
    count: steps.length,
  })

  return (
    <Stepper size="lg" colorScheme="gray" index={activeStep} color="white" mb="2rem">
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>

          <Box flexShrink="0">
            <StepTitle>{step.title}</StepTitle>
            <StepDescription color="white">{step.description}</StepDescription>
          </Box>

          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  );
}