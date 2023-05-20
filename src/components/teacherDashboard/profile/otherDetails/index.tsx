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
import Education from "./skills";
import Languages from "./languages";
import OtherCertifications from "./otherCertifications";
import { motion } from "framer-motion";


const OtherDetails = () => {

      const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [openSkillIndex, setOpenSkillsIndex] = useState(0);
  const [isSkillsCollapsed, setIsSkillsCollapsed] = useState(false);
  const [openLanguageIndex, setOpenLanguageIndex] = useState(0);
  const [isLanguagesCollapsed, setIsLanguagesCollapsed] = useState(false);
  const [openOtherCertificationsIndex, setOpenOtherCertificationsIndex] = useState(0);
  const [isOtherCertificationsCollapsed, setIsOtherCertificationsCollapsed] = useState(false);
  const [skills, setSkills] = useState([
    { skill: "", level: 0 }
  ]);

  const [languages, setLanguages] = useState([
    {
      language: "",
      fluency: 0,
    },
  ]);

  const [otherCertifications, setOtherCertifications] = useState([{certiFile: '', description: ""}])

  const handleAddNew = (statetype?: string) => {
    if (statetype === "language") {
      setLanguages([
        ...languages,
        {
      language: "",
      fluency: 0,
    }
      ]);
      setOpenLanguageIndex(languages.length);
      setIsLanguagesCollapsed(false);
    }else if(statetype === "certificate"){
      setOtherCertifications([
        ...otherCertifications,
      {certiFile: '', description: ""}])
      setOpenOtherCertificationsIndex(otherCertifications.length);
      setIsOtherCertificationsCollapsed(false);
    }else {
      setSkills([
        ...skills,
        { skill: "", level: 0 }
      ]);
      setOpenSkillsIndex(skills.length);
      setIsSkillsCollapsed(false);
    }
  };

  const handleDelete = (index: number, statetype?: string) => {
    if (statetype === "language") {
      setLanguages(languages.filter((_, i) => i !== index));
      setOpenLanguageIndex(0);
      setIsLanguagesCollapsed(false);
    }else if(statetype === "certificate"){
      setOtherCertifications(otherCertifications.filter((_, i) => i !== index));
      setOpenOtherCertificationsIndex(0);
      setIsOtherCertificationsCollapsed(false);
    } else {
      setSkills(skills.filter((_, i) => i !== index));
      setOpenSkillsIndex(0);
      setIsSkillsCollapsed(false);
    }
  };

  const handleToggle = (index: number, statetype?: string) => {
    if (statetype === "language") {
      if (index === openLanguageIndex) {
        setOpenLanguageIndex(0);
      } else {
        setOpenLanguageIndex(index);
      }
    }else if(statetype === "certificate"){
      if (index === openOtherCertificationsIndex) {
        setOpenOtherCertificationsIndex(0);
      } else {
        setOpenOtherCertificationsIndex(index);
      }
    } else {
      if (index === openSkillIndex) {
        setOpenSkillsIndex(0);
      } else {
        setOpenSkillsIndex(index);
      }
    }
  };

  const handleCollapseAll = (statetype?: string) => {
    if (statetype === "language") {
      setIsLanguagesCollapsed(!isLanguagesCollapsed);
      setOpenLanguageIndex(0);
    }else if(statetype === "certificate"){
      setIsOtherCertificationsCollapsed(!isOtherCertificationsCollapsed);
      setOpenOtherCertificationsIndex(0);
      console.log("coll")
    } else {
      setIsSkillsCollapsed(!isSkillsCollapsed);
      setOpenSkillsIndex(0);
    }
  };

  const handleFormChange = (
    field: string,
    value: string,
    index: number,
    statetype?: string
  ) => {
    if (statetype === "language") {
      setLanguages(
        languages.map((form, i) =>
          i === index ? { ...form, [field]: value } : form
        )
      );
    } else if(statetype === "certificate"){
      setOtherCertifications(otherCertifications.map((form, i) =>
          i === index ? { ...form, [field]: value } : form
        ),
      )
    }else {
      setSkills(skills.map((form, i) =>
          i === index ? { ...form, [field]: value } : form
        ),
      );
    }
    }

  const handleFileChange = (
    e: any,
    field: string,
    index: number,
  ) => {
    const selectedFile = e.target.files[0];
    const acceptedFileTypesRegex = /\.(jpg|jpeg|png|pdf|doc|docx)$/i;
    if (selectedFile && acceptedFileTypesRegex.test(selectedFile.name)) {
      setOtherCertifications(otherCertifications.map((form, i) =>
          i === index ? { ...form, [field]: selectedFile } : form
        ),
      )
    } else {
      e.target.value = "";
      toast({
        title: "Invalid file type",
        status: "error",
        isClosable: true,
      });
    }
  };

  const handleForm3Submit = () => {
    // e.preventDefault();
    let allData = {
      // skills: [ ...skills],
      skills: skills.filter((obj) => obj.skill !== ""),
      languages: languages.filter((obj) => obj.language !== ""),
      otherCertifications: otherCertifications.filter(
        (obj) => obj.description !== "" || obj.certiFile !== ""
      ),
    };

    alert(JSON.stringify(allData, null, 2))
    // handleTeacherFormSubmit(allData);
    // console.log(data)
  };

    return (      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 3px 16px 4px rgba(1,1,1,0.1);"
        bg="#fff"
        p={6}
        w="100%"
        mt={5}
      >
        <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
          Other Details <Text fontWeight="300" fontSize="15px">(Inputs should start or end with spaces)</Text>
        </Heading>
          <Education
            handleCollapseAll={handleCollapseAll}
            isSkillsCollapsed={isSkillsCollapsed}
            openSkillIndex={openSkillIndex}
            handleFormChange={handleFormChange}
            handleDelete={handleDelete}
            handleToggle={handleToggle}
            handleAddNew={handleAddNew}
            forms={skills}
          />
          <Languages
            handleCollapseAll={handleCollapseAll}
            islanguagesCollapsed={isLanguagesCollapsed}
            openLanguageIndex={openLanguageIndex}
            handleFormChange={handleFormChange}
            handleDelete={handleDelete}
            handleToggle={handleToggle}
            handleAddNew={handleAddNew}
            forms={languages}
          />

          <OtherCertifications
            handleCollapseAll={handleCollapseAll}
            isotherCertificationsCollapsed={isOtherCertificationsCollapsed}
            openOtherCertificationsIndex={openOtherCertificationsIndex}
            handleFormChange={handleFormChange}
            handleDelete={handleDelete}
            handleToggle={handleToggle}
            handleAddNew={handleAddNew}
            forms={otherCertifications}
            handleFileChange={handleFileChange}
          />
          
          <Flex justifyContent="flex-end" gap="5px" marginTop="3rem">
            <Button
              type="button"
              w="7rem"
              isDisabled={false}
              colorScheme="purple"
            >
              Previous
            </Button>
            <Button
              type="submit"
              w="7rem"
              isDisabled={false}
              colorScheme="purple"
            >
              Next
            </Button>
          </Flex>
      </Box>
)
}

export default OtherDetails