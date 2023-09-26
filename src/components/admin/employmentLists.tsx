import { ListItem, Box, Text } from "@chakra-ui/react";

interface EmploymentItemPropsInterface {
  jobTitle: string;
  employers: string;
  city: string;
  description?: string;
  period: string;
}

const EmploymentItem = ({
  jobTitle,
  employers,
  city,
  description,
  period,
}: EmploymentItemPropsInterface) => {
  return (
    <ListItem>
      <Box display="flex" gap=".5rem" alignItems="center">
        <Text fontWeight="700">Job Title:</Text>
        {jobTitle}
      </Box>
      <Box display="flex" gap=".5rem" alignItems="center">
        <Text fontWeight="700">Employers:</Text>
        {employers}
      </Box>
      <Box display="flex" gap=".5rem" alignItems="center">
        <Text fontWeight="700">City:</Text>
        {city}
      </Box>
      {description && (
        <Box display="flex" gap=".5rem" alignItems="center">
          <Text fontWeight="700">Description:</Text>
          {description}
        </Box>
      )}
      <Box display="flex" gap=".5rem" alignItems="center">
        <Text fontWeight="700">Period:</Text>
        {period}
      </Box>
    </ListItem>
  );
};

export default EmploymentItem;
