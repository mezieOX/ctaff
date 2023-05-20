
import {
  Box,
  Flex,
  Heading,
  Text,
  useDisclosure,
  Image, 
  useToast,
  Input
} from "@chakra-ui/react";
import { ColorRing } from "react-loader-spinner";
import {RiCamera2Line} from 'react-icons/ri'
import { useState, useEffect } from "react";
import ConfimationDialogue from "@/components/form/multistepForms/form1/confirmationDialog"
import BasicDetails from "./basicDetails"
import AvailabilityDetails from "./availabilityDetails"
import UserDetails from "./userDetails"
import OtherDetails from "./otherDetails"
import axios from 'axios'

interface AvailabilityInfo {
  levelDetails: {
    teachingExperience: string;
    highestDegree: string;
    availabilityState: string;
    availabilityCity: string;
  };
  subjects: string[];
  teachableClass: string[];
  availableDays: Record<string, { am: boolean; pm: boolean }>;
}


const ProfilePage = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [detail, setDetail] = useState("")
  const [isFetching, setIsFetching] = useState(false)
  const [basicDetailsLoading, setBasicDetailsLoading] = useState(false)
  const [availabilityDetailsLoading, setAvailabilityDetailsLoading] = useState(false)
  const [newProfilePic, setNewProfilePic] = useState(null)
  let url = process.env.NEXT_PUBLIC_API_URL;
  const toast = useToast()
  const [subjectVal, setSubjectVal] = useState("");

  const [loadedAvailabilityData, setLoadedAvailabilityData] = useState<AvailabilityInfo>({
    levelDetails: {
      teachingExperience: "Less than 6 months",
      highestDegree: "bsc",
      availabilityState: "Abuja",
      availabilityCity: "Gwagwa",
    },
    subjects: ["maths", "physics"],
    teachableClass: ["tertiary"],
    availableDays: {
      Monday: {
        am: false,
        pm: true,
      },
    },
  });

  const [availabilityInfo, setAvailabilityInfo] = useState(loadedAvailabilityData);
  const [availabilityChanged, setAvailabilityChanged] = useState(false);

  useEffect(() => {
    if(JSON.stringify(loadedAvailabilityData) !== JSON.stringify(availabilityInfo)){
      setAvailabilityChanged(false)
    }else{
      setAvailabilityChanged(true)
    }
  }, [availabilityInfo, loadedAvailabilityData, availabilityChanged])

  const handleOptionChange = (e: any) => {
    const { name, value } = e.target;
    setAvailabilityInfo({
      ...availabilityInfo,
      levelDetails: { ...availabilityInfo.levelDetails, [name]: value },
    });
  };

  const handleCheckboxes = (values: any) => {
    setAvailabilityInfo({ ...availabilityInfo, teachableClass: values });
  };

  const handleAvailabilityCheck = (day: string, period: "am" | "pm") => {
    setAvailabilityInfo((prevAvailabilityInfo: any) => {
      const updatedDays = { ...prevAvailabilityInfo.availableDays };

      if (updatedDays[day]) {
        updatedDays[day][period] = !updatedDays[day][period];
      } else {
        updatedDays[day] = { [period]: true };
      }

      return {
        ...prevAvailabilityInfo,
        availableDays: updatedDays,
      };
    });
  };

  const handleAddSubject = () => {
    let newSubj = subjectVal.trim();
    if (newSubj) {
      setAvailabilityInfo({
        ...availabilityInfo,
        subjects: [...availabilityInfo.subjects, newSubj],
      });

      setSubjectVal("");
    }
  };

  const handleSubjDelete = (index: number) => {
    setAvailabilityInfo({
      ...availabilityInfo,
      subjects: availabilityInfo.subjects.filter((subjects: string, i) => i !== index),
    });
  };

  function handleKeyDown(event: any) {
    if (event.key === "Enter") {
      handleAddSubject();
    }
  }


  let [unmutableBasic, setUnmutableBasic ] = useState({
    firstname: 'james',
    lastname: 'brwonm',
    gender: 'female',
    phone: '0987654345678',
    city: 'lagos',
    nationality: 'niger',
    state: "lasjs",
    address: 'ijesha',
    occupation: "farmer"
  }) 

  let [loadedBasicData, setLoadedBasicData ] = useState(unmutableBasic) 


  let [basicData, setBasicData] = useState<typeof loadedBasicData>({})

  const handleGenderChange = (value: string) => {
    setLoadedBasicData({ ...loadedBasicData, gender: value });
    if(value === unmutableBasic['gender']){
      const { gender, ...rest} = basicData
      setBasicData(rest)
    }else{
      setBasicData({ ...basicData, gender: value });
    }
  };

  const handleInputsChange = (e: any) => {
    const {name, value} = e.target
    setLoadedBasicData({ ...loadedBasicData, [name]: value });
    if(value === unmutableBasic[name] as any){
      const { [name as any]: _, ...rest} = basicData
      setBasicData(rest)
    }else{
      setBasicData({ ...basicData, [name]: value });
    }
  }



  function onFormSubmit() {
    if(detail === "basic"){
      alert(JSON.stringify(basicData, null, 4))
      setBasicDetailsLoading(true)
    }else if(detail === "availability"){
      setAvailabilityDetailsLoading(true)
      alert(JSON.stringify(availabilityInfo, null, 4))
    }
  }

  function handleProfilePicChange(){
    const file: any = document.getElementById("fileUpload")
    file.click()
    console.log(file)
  }

  const handleFileChange = async(e: any) => {
    setIsFetching(true)
    const selectedFile = e.target.files[0];
    const acceptedFileTypesRegex = /\.(jpg|jpeg|png)$/i;
    if (selectedFile && acceptedFileTypesRegex.test(selectedFile.name)) {
      console.log(selectedFile)
      let pic = new FormData()
      pic.append('profilePicture', selectedFile)
      try {
        const {basicData} = await axios.post(`${url}/users/changeProfilePic`, pic) as any
        setIsFetching(false)

        console.log(basicData)
        setNewProfilePic(basicData)
      } catch (err: any) {
        console.log(err)
        setIsFetching(false)
      }
    } else {
      setIsFetching(false)
      e.target.value = "";
      toast({
        title: "Invalid file type",
        status: "error",
        isClosable: true,
      });
    }
  };


    return (
      <Flex
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        mx="auto"
        //   py="8rem"
        // bg="#37254b"
        w={["100%"]}
      >
        <ConfimationDialogue
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          handleSubmit={onFormSubmit}
        />
        <Heading
          as="h1"
          fontSize="2rem"
          fontWeight="bold"
          lineHeight="tight"
          letterSpacing="tight"
          color="#000"
          mt={0}
          mb={4}
          mr="auto"
        >
          Profile
          <Text fontWeight="500" fontSize="15px">
            (You can update and make changes to your profile)
          </Text>
        </Heading>
        <Box
          // px={6}
          py={8}
          h="100%"
          w="100%"
          // bg="linear-gradient(50deg, rgba(-198, 2, 52, -1.99), gray);"
          // bg="#37254b"
          rounded="lg"
          shadow="xl"
        >
          <Flex        
            // w={{base: '80%', md: '70%', lg: "55%"}}
            // h={{base: '4%', md: '10%', lg: "9%"}}
            // w={['100%', '80%','60%','40%']}
            // h={['19%','30%']}
            w={['15rem']}
            h={['15rem']}
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            mx="auto"
            my="2rem"
            gap="1rem"

          >
            <Box 
              display="flex" 
              flexDir="row" 
              alignItems="center" 
              gap="2px" 
              cursor={isFetching? "not-allowed": "pointer"}
              _hover={{color:"purple", shadow: isFetching? 'none': "1px 3px 16px 4px rgba(1,1,1,0.1)"}}
              onClick={handleProfilePicChange}
            >
              <Text fontWeight={500}>Change profile picture</Text>
               <RiCamera2Line/>
              <Input
                id="fileUpload"
                display="none"
                bg="#fff"
                type='file'
                disabled={isFetching}
                onChange={handleFileChange}
              />
            </Box>
            <Flex
              shadow="1px 3px 16px 4px rgba(1,1,1,0.5);"
              _hover={{shadow: "1px 3px 16px 4px rgba(1,1,1,0.1)"}}
              // background="gray.200"
              opacity={isFetching? ".6": "1"}
              transition=".2s"
              w={["80%"]}
              h={["80%"]}
              rounded="full"
              alignItems="center"
              justifyContent="center"
              mx="auto"
              // cursor="pointer"
              position="relative"
              overflow="hidden"
            >
              {/* {showloadingring && <ColorRing width={30} height={30} />} */}
              {isFetching && 
                (<Box pos="absolute">
                  <ColorRing width={30} height={30} />
                </Box>)
              }
              <Image               
                rounded="full"
                alt="profilepic" 
                objectFit="center"
                width="100%"
                height="100%"
                transition="transform 0.3s"
                _hover={{
                  transform: isFetching? "none": "scale(1.1)"
                }}
                src={newProfilePic ? newProfilePic: "https://res.cloudinary.com/bluebberies/image/upload/v1684218709/pg2q4plxrvlnqsqtqhwx.jpg"}/>
            </Flex>
          </Flex>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "2rem",
            }}
            // onSubmit={handleSubmit(onSubmit)}
            onSubmit={(e) => {
              e.preventDefault();
              setDetail("basic");
              onOpen();
            }}
          >
            <BasicDetails showloadingring={basicDetailsLoading} data={basicData} handleInputsChange={handleInputsChange} handleGenderChange={handleGenderChange} loadedData={loadedBasicData}/>
          </form>
                    <form
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "2rem",
            }}
            onSubmit={(e) => {
              e.preventDefault();
              setDetail("availability");
              onOpen();
            }}
          >
            <AvailabilityDetails  
                loadedAvailabilityData={loadedAvailabilityData}
                handleAvailabilityCheck={handleAvailabilityCheck}
                availabilityInfo={availabilityInfo}
                handleCheckboxes={handleCheckboxes}
                handleOptionChange={handleOptionChange}
                handleSubjDelete={handleSubjDelete}
                handleKeyDown={handleKeyDown}
                setSubjectVal={setSubjectVal}
                handleAddSubject={handleAddSubject}
                subjectVal={subjectVal}
                availabilityChanged={availabilityChanged}
                availabilityDetailsLoading={availabilityDetailsLoading}
              />
          </form>


          {/* <form
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "2rem",
            }}
            onSubmit={(e) => {
              e.preventDefault();
              setDetail("user");
              onOpen();
            }}
          >
            <UserDetails />
          </form> */}
          {/* <form
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "2rem",
            }}
            onSubmit={(e) => {
            e.preventDefault();
            setDetail("user")
            onOpen();
          }}
          >
              <OtherDetails/>
          </form> */}
        </Box>
      </Flex>
    );
}

export default ProfilePage