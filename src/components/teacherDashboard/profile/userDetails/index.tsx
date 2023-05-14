import {
  Button,
  Heading,
  Flex,
  Box,
  useToast,
  useDisclosure,
  Text
} from "@chakra-ui/react";
import { useState } from "react";
import Education from "./education";
import Employment from "./employment";
import { motion } from "framer-motion";
import ConfimationDialogue from "../../multistepForms/form1/confirmationDialog";

// interface EmploymentState {
//   certificate: string;
//   city: string;
//   employers: string;
//   position: string;
//   startdate: string;
//   enddate: string;
// }


const UserDetails = () => {
      const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [openEduIndex, setOpenEduIndex] = useState(0);
  const [isEduCollapsed, setIsEduCollapsed] = useState(false);
  const [openEmploymentIndex, setOpenEmploymentIndex] = useState(0);
  const [isEmploymentCollapsed, setIsEmploymentCollapsed] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [educationalDetails, setEducationalDetails] = useState({
    level: "",
    olevelResult: "",
    details: [
      {
        edutype: "",
        school: "",
        city: "",
        startdate: "",
        enddate: "",
        certificate: "",
      },
    ],
  });

  const [employmentDetails, setEmploymentDetails] = useState<EmploymentState[]>(
    []
  );

  const handleCheckboxChange = (
    event: any,
    index: number,
    statetype?: string
  ) => {
    // setIsChecked(event.target.checked);
    if (statetype === "employment") {
      if (event.target.checked) {
        setEmploymentDetails(
          employmentDetails?.map((form, i) =>
            i === index
              ? { ...form, enddate: new Date().toLocaleDateString("en-CA") }
              : form
          )
        );
      } else {
        setEmploymentDetails(
          employmentDetails?.map((form, i) =>
            i === index ? { ...form, enddate: "" } : form
          )
        );
      }
    } else {
      if (event.target.checked) {
        setEducationalDetails({
          ...educationalDetails,
          details: educationalDetails.details.map((form, i) =>
            i === index
              ? { ...form, enddate: new Date().toLocaleDateString("en-CA") }
              : form
          ),
        });
      } else {
        setEducationalDetails({
          ...educationalDetails,
          details: educationalDetails.details.map((form, i) =>
            i === index ? { ...form, enddate: "" } : form
          ),
        });
      }
    }
  };

  let eduForms = educationalDetails.details;
  let employmentForms = employmentDetails;

  const handleAddNew = (statetype?: string) => {
    if (statetype === "employment") {
      setEmploymentDetails([
        ...employmentDetails,
        {
          certificate: "",
          city: "",
          employers: "",
          position: "",
          startdate: "",
          enddate: "",
        },
      ]);
      setOpenEmploymentIndex(employmentForms.length);
      setIsEmploymentCollapsed(false);
    } else {
      setEducationalDetails({
        ...educationalDetails,
        details: [
          ...educationalDetails.details,
          {
            edutype: "",
            school: "",
            city: "",
            startdate: "",
            enddate: "",
            certificate: "",
          },
        ],
      });
      setOpenEduIndex(eduForms.length);
      setIsEduCollapsed(false);
    }
  };

  const handleDelete = (index: number, statetype?: string) => {
    if (statetype === "employment") {
      setEmploymentDetails(employmentDetails.filter((_, i) => i !== index));
      setOpenEmploymentIndex(0);
      setIsEmploymentCollapsed(false);
    } else {
      setEducationalDetails({
        ...educationalDetails,
        details: educationalDetails.details.filter((_, i) => i !== index),
      });
      setOpenEduIndex(0);
      setIsEduCollapsed(false);
    }
  };

  const handleToggle = (index: number, statetype?: string) => {
    if (statetype === "employment") {
      if (index === openEmploymentIndex) {
        setOpenEmploymentIndex(0);
      } else {
        setOpenEmploymentIndex(index);
      }
    } else {
      if (index === openEduIndex) {
        setOpenEduIndex(0);
      } else {
        setOpenEduIndex(index);
      }
    }
  };

  const handleCollapseAll = (statetype?: string) => {
    if (statetype === "employment") {
      setIsEmploymentCollapsed(!isEmploymentCollapsed);
      setOpenEmploymentIndex(0);
    } else {
      setIsEduCollapsed(!isEduCollapsed);
      setOpenEduIndex(0);
    }
  };

  const handleFormChange = (
    field: string,
    value: string,
    index?: number,
    statetype?: string
  ) => {
    if (statetype === "employment") {
      setEmploymentDetails(
        employmentDetails.map((form, i) =>
          i === index ? { ...form, [field]: value } : form
        )
      );
    } else {
      setEducationalDetails({
        ...educationalDetails,
        details: educationalDetails.details.map((form, i) =>
          i === index ? { ...form, [field]: value } : form
        ),
      });
    }
  };

  // , type?: string, index?: number

  const handleFileChange = (
    e: any,
    field: string,
    type?: string,
    index?: number,
    statetype?: string
  ) => {
    const selectedFile = e.target.files[0];
    const acceptedFileTypesRegex = /\.(jpg|jpeg|png|pdf|doc|docx)$/i;
    if (selectedFile && acceptedFileTypesRegex.test(selectedFile.name)) {
      if (statetype === "employment") {
        setEmploymentDetails(
          employmentDetails.map((form, i) =>
            i === index ? { ...form, [field]: selectedFile } : form
          )
        );
      } else {
        if (type) {
          setEducationalDetails({
            ...educationalDetails,
            [field]: selectedFile,
          });
        } else {
          setEducationalDetails({
            ...educationalDetails,
            details: educationalDetails.details.map((form, i) =>
              i === index ? { ...form, [field]: selectedFile } : form
            ),
          });
        }
      }
    } else {
      e.target.value = "";
      toast({
        title: "Invalid file type",
        status: "error",
        isClosable: true,
      });
    }
  };

  const handleLevelChange = (e: any) => {
    let { value, name } = e.target;
    setEducationalDetails({ ...educationalDetails, level: value });
  };

  const handleForm2Submit = () => {
    // e.preventDefault();
    let allData = {
      educationalDetails: { ...educationalDetails },
      employmentDetails: [...employmentDetails],
    };
    // handleTeacherFormSubmit(allData);
    // console.log(data)
  };

  const handleAddForm = (statetype?: string) => {
    setEmploymentDetails([
      {
        certificate: "",
        city: "",
        employers: "",
        position: "",
        startdate: "",
        enddate: "",
      },
    ]);
  };

    return (       <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 3px 16px 4px rgba(1,1,1,0.1);"
        bg="#fff"
        p={6}
        w="100%"
        mt={5}
      >
        <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
          User Details{" "}
          <Text fontWeight="300" fontSize="15px">
            (Inputs should start or end with spaces)
          </Text>
        </Heading>
          <Education
            handleLevelChange={handleLevelChange}
            handleFileChange={handleFileChange}
            handleCollapseAll={handleCollapseAll}
            isEduCollapsed={isEduCollapsed}
            openEduIndex={openEduIndex}
            handleFormChange={handleFormChange}
            handleDelete={handleDelete}
            handleToggle={handleToggle}
            handleAddNew={handleAddNew}
            forms={eduForms}
            setIsChecked={setIsChecked}
            handleCheckboxChange={handleCheckboxChange}
            // educationalDetails={educationalDetails}
          />
          <Employment
            handleLevelChange={handleLevelChange}
            handleFileChange={handleFileChange}
            handleCollapseAll={handleCollapseAll}
            isEmploymentCollapsed={isEmploymentCollapsed}
            openEmploymentIndex={openEmploymentIndex}
            handleFormChange={handleFormChange}
            handleDelete={handleDelete}
            handleToggle={handleToggle}
            handleAddNew={handleAddNew}
            forms={employmentDetails}
            setIsChecked={setIsChecked}
            handleCheckboxChange={handleCheckboxChange}
          />

          <Flex justifyContent="flex-end" gap="5px" marginTop="3rem">
            <Button
              type="submit"
              w="7rem"
              isDisabled={false}
              colorScheme="purple"
            >
              Update
            </Button>
          </Flex>
      </Box>
 );
}
 
export default UserDetails;