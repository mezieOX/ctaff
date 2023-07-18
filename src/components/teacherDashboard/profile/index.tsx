import {
  Box,
  Flex,
  Heading,
  Text,
  useDisclosure,
  Image,
  useToast,
  Input,
  CircularProgress,
} from "@chakra-ui/react";
// import Image from 'next/image'
import { ColorRing } from "react-loader-spinner";
import { RiCamera2Line } from "react-icons/ri";
import { useState, useEffect } from "react";
import ConfimationDialogue from "@/components/form/multistepForms/form1/confirmationDialog";
import BasicDetails from "./basicDetails";
import AvailabilityDetails from "./availabilityDetails";
import UserDetails from "./userDetails";
import OtherDetails from "./otherDetails";
import { logout } from "@/utils/logout";
import { useRouter } from "next/router";
import axios from "axios";

export interface AvailabilityInfo {
  levelDetails: {
    yearsOfExperience: string;
    highestDegreeObtained: string;
    availabilityState: string;
    availabilityCity: string;
  };
  teachableSubjects: string[];
  teachableLevels: string[];
  availabilityStatus: string;
  availableDays: Record<string, { am: boolean; pm: boolean }>;
}

const ProfilePage = ({
  teacherData,
  setSidebarTeacherData,
}: {
  teacherData: any;
  setSidebarTeacherData: any;
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const router = useRouter();
  const [detail, setDetail] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [basicDetailsLoading, setBasicDetailsLoading] = useState(false);
  const [availabilityDetailsLoading, setAvailabilityDetailsLoading] =
    useState(false);
  const [availabilityChanged, setAvailabilityChanged] = useState(false);
  const [subjectVal, setSubjectVal] = useState("");
  const [updatedTeacherData, setUpdatedTeacherData] = useState(teacherData);
  let url = process.env.NEXT_PUBLIC_API_URL;
  const toast = useToast();

  // console.log("teacherData", teacherData);
  function setAvDetails(data: any){
    let avDetails: Record<string, { am: boolean; pm: boolean }> = {};
    data.teacher.availabilityDays.forEach((item: any) => {
      const { am, pm, day } = item;
      avDetails[day] = { am, pm };
    });

    return avDetails
  }

  const [loadedAvailabilityData, setLoadedAvailabilityData] =
    useState<AvailabilityInfo>({
      levelDetails: {
        yearsOfExperience: updatedTeacherData.teacher.yearsOfExperience,
        highestDegreeObtained: updatedTeacherData.teacher.highestDegreeObtained,
        availabilityState:
          updatedTeacherData.teacher.availabilityLocation[0].state,
        availabilityCity:
          updatedTeacherData.teacher.availabilityLocation[0].city,
      },
      teachableSubjects: updatedTeacherData.teacher.teachableSubjects
        .sort()
        .map((item: any) => item.subject),
      teachableLevels: updatedTeacherData.teacher.teachableLevels.map(
        (item: any) => item.level
      ),
      availabilityStatus: updatedTeacherData.teacher.availabilityStatus,
      availableDays: setAvDetails(updatedTeacherData),
    });

  const [availabilityInfo, setAvailabilityInfo] = useState(
    loadedAvailabilityData
  );

  // function updteLoadedAvailDetails(updatedTeacherData: any) {
  //   return };
  // }
  // const [availabilityChanged, setAvailabilityChanged] = useState(false);

  // useEffect(() => {
  //   if (
  //     JSON.stringify(loadedAvailabilityData) !==
  //     JSON.stringify(availabilityInfo)
  //   ) {
  //     setAvailabilityChanged(false);
  //   } else {
  //     setAvailabilityChanged(true);
  //   }
  // }, [availabilityInfo, loadedAvailabilityData, availabilityChanged]);

  const handleOptionChange = (e: any) => {
    const { name, value } = e.target;
    setAvailabilityInfo({
      ...availabilityInfo,
      levelDetails: { ...availabilityInfo.levelDetails, [name]: value },
    });
  };

  const handleCheckboxes = (values: any) => {
    setAvailabilityInfo({ ...availabilityInfo, teachableLevels: values });
  };

  const handleAvailabilityCheck = (day: string, period: "am" | "pm") => {
    // setAvailabilityInfo((prevAvailabilityInfo: any) => {
    //   console.log("prevAvailabilityInfo", prevAvailabilityInfo);
    //   const updatedDays = { ...prevAvailabilityInfo.availableDays };

    //   if (updatedDays[day]) {
    //     updatedDays[day][period] = !updatedDays[day][period];
    //   } else {
    //     updatedDays[day] = { [period]: true };
    //   }

    //   return {
    //     ...prevAvailabilityInfo,
    //     availableDays: updatedDays,
    //   };
    // });
    setAvailabilityInfo({
      ...availabilityInfo,
      availableDays: {
        ...availabilityInfo.availableDays,
        [day]: {
          ...availabilityInfo.availableDays[day],
          [period]: availabilityInfo.availableDays[day][period]
            ? !availabilityInfo.availableDays[day][period]
            : true,
        },
      },
    });
  };

  const handleAddSubject = () => {
    let newSubj = subjectVal.trim();
    const subjRepeated = availabilityInfo.teachableSubjects.filter((item: string) => item.toLowerCase().includes(newSubj.toLowerCase())).length > 0

    if(!subjRepeated){
      if (newSubj) {
        setAvailabilityInfo({
          ...availabilityInfo,
          teachableSubjects: [...availabilityInfo.teachableSubjects, newSubj],
        });
  
        setSubjectVal("");
      }
    }else{
      setSubjectVal("");
    }
  };

  const handleSubjDelete = (index: number) => {
    setAvailabilityInfo({
      ...availabilityInfo,
      teachableSubjects: availabilityInfo.teachableSubjects.filter(
        (subjects: string, i: number) => i !== index
      ),
    });
  };

  function handleKeyDown(event: any) {
    if (event.key === "Enter") {
      handleAddSubject();
    }
  }

  let [unmutableBasic, setUnmutableBasic] = useState({
    firstname: updatedTeacherData.firstname,
    lastname: updatedTeacherData.lastname,
    phone: updatedTeacherData.phone,
    gender: updatedTeacherData.teacher.gender,
    city: updatedTeacherData.teacher.city,
    nationality: updatedTeacherData.teacher.nationality,
    stateOfOrigin: updatedTeacherData.teacher.stateOfOrigin,
    address: updatedTeacherData.teacher.address,
    currentOccupation: updatedTeacherData.teacher.currentOccupation,
  });

  let [loadedBasicData, setLoadedBasicData] = useState(unmutableBasic);

  let [basicData, setBasicData] = useState<Partial<typeof loadedBasicData>>({});

  const handleGenderChange = (value: string) => {
    setLoadedBasicData({ ...loadedBasicData, gender: value });
    if (value === unmutableBasic["gender"]) {
      const { gender, ...rest } = basicData;
      setBasicData(rest);
    } else {
      setBasicData({ ...basicData, gender: value });
    }
  };

  const handleCurrentlyAvailableChange = (value: string) => {
    setAvailabilityInfo({
      ...availabilityInfo,
      availabilityStatus: value
    });
  };

  const handleInputsChange = (e: any) => {
    const { name, value } = e.target;
    setLoadedBasicData({ ...loadedBasicData, [name]: value });
    if (
      value === (unmutableBasic[name as keyof typeof unmutableBasic] as any)
    ) {
      const { [name as keyof typeof basicData]: _, ...rest } = basicData;
      setBasicData(rest);
    } else {
      setBasicData({ ...basicData, [name]: value });
    }
  };

  async function onFormSubmit() {
    try {
      onClose();
      if (detail === "basic") {
        setBasicDetailsLoading(true);
        const { data } = await axios.patch(
          "/api/users/updateTeacherDetails",
          basicData
        );
        setBasicData({});
        setBasicDetailsLoading(false);
        setUpdatedTeacherData(data);
        setSidebarTeacherData(data);
      } else if (detail === "availability") {
        setAvailabilityDetailsLoading(true);
        const availObj = {};
        const avDataKeys = Object.keys(loadedAvailabilityData);
        for (let key of avDataKeys) {
          if (key === "levelDetails") {
            const avkey2 = Object.keys(loadedAvailabilityData[key]);
            for (let inKey of avkey2) {
              if (
                JSON.stringify(
                  loadedAvailabilityData[key][inKey]
                ) !== JSON.stringify(availabilityInfo[key][inKey])
              ) {
                availObj[inKey] = availabilityInfo[key][inKey];
              }
            }
            continue;
          }
          if (
            JSON.stringify(loadedAvailabilityData[key]) !==
            JSON.stringify(availabilityInfo[key])
          ) {
            availObj[key] = availabilityInfo[key];
          }
        }

        console.log(availObj);

        const { data } = await axios.patch(
          "/api/users/updateTeacherDetails",
          availObj
        );
        console.log("data", data);
        setLoadedAvailabilityData({
          levelDetails: {
            yearsOfExperience: data.teacher.yearsOfExperience,
            highestDegreeObtained: data.teacher.highestDegreeObtained,
            availabilityState: data.teacher.availabilityLocation[0].state,
            availabilityCity: data.teacher.availabilityLocation[0].city,
          },
          teachableSubjects: data.teacher.teachableSubjects
            .sort()
            .map((item: any) => item.subject),
          teachableLevels: data.teacher.teachableLevels.map(
            (item: any) => item.level
          ),
          availabilityStatus: data.teacher.availabilityStatus,
          availableDays: setAvDetails(data)
        });
        setAvailabilityDetailsLoading(false);
        setUpdatedTeacherData(data);
        setSidebarTeacherData(data);
        setAvailabilityChanged(false);
      }
      toast({
        title: "Updated!",
        status: "success",
        isClosable: true,
      });
    } catch (err: any) {
      console.log("err", err);
      onClose();
      setBasicDetailsLoading(false);
      setAvailabilityDetailsLoading(false);
      setAvailabilityChanged(false);
      if (err.response?.status == 401 || err.response?.status == 403) {
        return logout(router, "/login");
      }
      toast({
        title: err?.response?.data?.message || "Something failed!",
        status: "error",
        isClosable: true,
      });
    }
  }

  function handleProfilePicChange() {
    const file: any = document.getElementById("fileUpload");
    file.click();
  }

  const handleFileChange = async (e: any) => {
    setIsFetching(true);
    const selectedFile = e.target.files[0];
    const acceptedFileTypesRegex = /\.(jpg|jpeg|png)$/i;
    if (selectedFile && acceptedFileTypesRegex.test(selectedFile.name)) {
      let pic = new FormData();
      pic.append("profilePicture", selectedFile);
      try {
        const { data: tokens } = await axios.get("/api/auth/get_tokens");
        const { accessToken, refreshToken } = tokens;
        if (accessToken && refreshToken) {
          const { data } = await axios.patch(
            `${url}/users/changeProfilePic`,
            pic,
            {
              headers: {
                authorization: `Bearer ${accessToken}` as string,
                refresh_token: refreshToken as string,
              },
            }
          );
          setUpdatedTeacherData(data);
          setSidebarTeacherData(data);
          setIsFetching(false);
        } else {
          return logout(router, "/login");
        }
      } catch (err: any) {
        setIsFetching(false);
        if (err.response?.status == 401 || err.response?.status == 403) {
          return logout(router, "/login");
        }
        toast({
          title: err?.response?.data?.message || "Something failed!",
          status: "error",
          isClosable: true,
        });
      }
    } else {
      setIsFetching(false);
      e.target.value = "";
      toast({
        title: "Invalid file type",
        status: "error",
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (
      JSON.stringify(loadedAvailabilityData) !==
      JSON.stringify(availabilityInfo)
    ) {
      setAvailabilityChanged(false);
    } else {
      setAvailabilityChanged(true);
    }
  }, [availabilityInfo, loadedAvailabilityData]);

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
          w={["15rem"]}
          h={["15rem"]}
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
            cursor={isFetching ? "not-allowed" : "pointer"}
            _hover={{
              color: "purple",
              shadow: isFetching ? "none" : "1px 3px 16px 4px rgba(1,1,1,0.1)",
            }}
            onClick={handleProfilePicChange}
          >
            <Text fontWeight={500} color="blue">
              Change profile picture
            </Text>
            <RiCamera2Line />
            <Input
              id="fileUpload"
              display="none"
              bg="#fff"
              type="file"
              disabled={isFetching}
              onChange={handleFileChange}
            />
          </Box>
          <Flex
            shadow="1px 3px 16px 4px rgba(1,1,1,0.5);"
            _hover={{ shadow: "1px 3px 16px 4px rgba(1,1,1,0.1)" }}
            // background="gray.200"
            opacity={isFetching ? ".6" : "1"}
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
            {isFetching && (
              <Box pos="absolute">
                <CircularProgress size="30px" isIndeterminate pr={2} />
              </Box>
            )}
            <Image
              rounded="full"
              alt="profilepic"
              // objectFit="center"
              objectFit="cover"
              width="100%"
              height="100%"
              transition="transform 0.3s"
              _hover={{
                transform: isFetching ? "none" : "scale(1.1)",
              }}
              fallbackSrc={"/images/default-avatar.png"}
              src={updatedTeacherData?.teacher?.picture}
            />
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
          <BasicDetails
            showloadingring={basicDetailsLoading}
            data={basicData}
            handleInputsChange={handleInputsChange}
            handleGenderChange={handleGenderChange}
            loadedData={loadedBasicData}
          />
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
            availabilityDetailsLoading={availabilityDetailsLoading}
            availabilityChanged={availabilityChanged}
            handleCurrentlyAvailableChange={handleCurrentlyAvailableChange}
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
};

export default ProfilePage;
