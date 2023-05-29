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
import { ColorRing } from "react-loader-spinner";
import ConfimationDialogue from "../../multistepForms/form1/confirmationDialog";

interface EmploymentState {
  description: string;
  city: string;
  employers: string;
  position: string;
  startdate: string;
  enddate: string;
}

const Form2 = ({
  handleTeacherFormSubmit,
  showloadingring
}: {
  handleTeacherFormSubmit: any,
  showloadingring: any
}) => {
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
          description: "",
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
    let allData = {
      educationalDetails: { ...educationalDetails },
      employmentDetails: [...employmentDetails],
    };
    let formData = new FormData()
    formData.append('level', allData.educationalDetails.level)
    formData.append('olevelCertificate', allData.educationalDetails.olevelResult)
    for (const obj of allData.educationalDetails.details){
      for (const data in obj) {
        if (data == "certificate") {
          formData.append("educationalCertificates", obj[data] as any);
          continue;
        }
        formData.append(`edu${data}`, obj[data as keyof typeof obj] as any);
      }
    }
    for (const obj of allData.employmentDetails){
      for (const data in obj) {
        // if (data == "certificate") {
        //   formData.append("employmentCertificates", obj[data] as any);
        //   continue;
        // }
        formData.append(`emplmnt${data}`, obj[data as keyof typeof obj] as any);
      }
    }

    onClose()

    handleTeacherFormSubmit(formData);
    // alert(JSON.stringify(allData, null, 2))
    console.log(allData)
  };

  const handleAddForm = (statetype?: string) => {
    setEmploymentDetails([
      {
        description: "",
        city: "",
        employers: "",
        position: "",
        startdate: "",
        enddate: "",
      },
    ]);
  };

  return (
    <motion.div
      key="form2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ConfimationDialogue
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        handleSubmit={handleForm2Submit}
      />
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 3px 16px 17px rgba(0,0,0,0.3);"
        bg="#fff"
        p={6}
        w="100%"
      >
        <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
          User Details{" "}
          <Text fontWeight="300" fontSize="15px">
            (Inputs should start or end with spaces)
          </Text>
        </Heading>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onOpen();
          }}
          // onSubmit={handleForm2Submit}
        >
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
              isDisabled={showloadingring}
              colorScheme="purple"
            >
              {!showloadingring && "Next"}
              {showloadingring && <ColorRing width={30} height={30} />}
            </Button>
          </Flex>
        </form>
      </Box>
    </motion.div>
  );
};

export default Form2;
