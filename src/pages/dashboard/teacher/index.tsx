import { NextPage } from "next";
import DashBoardHome from "../../../components/teacherDashboard/dashboardHome";
import DashBoardLayout from "../../../components/teacherDashboard/";

const TeacherDashboard: NextPage = () => {
  // const [sidebar, setSideBar] = useState("large");
  // const [showSidebar, setShowSideBar] = useState(false);
  // const [mobileSideBarActive, setMobileSideBarActive] = useState(false);
  // const [path, setPath] = useState("");
  // const [loading, setLoading] = useState(false);
  // const { isOpen, onOpen, onClose } = useDisclosure();


  // const title = `${siteTitle} - my-dashboard`;

  // const handleHamburgerClick = () => {
  //   setShowSideBar(!showSidebar);
  //   setMobileSideBarActive(true);
  // };

  // useEffect(() => {
  //   const path = Router.asPath;
  //   if (path.endsWith("/student")) setPath("home");
  //   else if (path.includes("recent")) setPath("recent");
  //   else if (path.includes("quiz")) setPath("quiz");
  // }, []);

  // Router.events.on("hashChangeStart", (url: string) => {
  //   setLoading(true);
  //   if (url.includes("quiz")) {
  //     setPath("quiz");
  //   } else if (url.includes("recent")) {
  //     setPath("recent");
  //   } else {
  //     setPath("home");
  //   }
  // });

  // Router.events.on("hashChangeComplete", () => {
  //   setLoading(false);
  // });

  // function checkLoadingState() {
  //   if (!loading) {
  //     return <DashBoardHome />
  //   } else return <CircularProgress size="30px" isIndeterminate pr={2} />;
  // }

  return (
    <>
    <DashBoardLayout pageTitle="My Dashboard">
      <DashBoardHome/>
      </DashBoardLayout>
      {/* <Head>
        <title>{title}</title>
      </Head>
        <Notifications isOpen={isOpen} onClose={onClose}/>

      <Flex>
        <IconButton
          display={{ base: "flex", sm: "none" }}
          background="black"
          pos="fixed"
          right="5"
          zIndex="10"
          borderRadius="16px"
          aria-label="sidebar-Toggle"
          color="#fff"
          mt="5"
          _hover={{
            background: "black",
            color: "white",
          }}
          _active={{
            background: "white",
            color: "black",
          }}
          icon={<FiMenu />}
          onClick={handleHamburgerClick}
        />

        <SideBar
          sidebar={sidebar}
          showSidebar={showSidebar}
          setSideBar={setSideBar}
          setShowSideBar={setShowSideBar}
          mobileSideBarActive={mobileSideBarActive}
        />

        <Flex
          ml={{ base: "30px", sm: sidebar === "large" ? "250px" : "150px" }}
          mt="12"
          flexDir="column"
          gap="10px"
          transition={"margin-left .6s ease"}
          minHeight="container.md"
          w="80%"
          mb={10}
        >
          <IconButton
            size="sm"
            pos="fixed"
            top="6"
            right="20"
            zIndex="4"
            _hover={{ bg: "none" }}
            aria-label="open menu"
            icon={
              <>
                <Avatar bg="#37254b" onClick={onOpen} icon={<FaBell />}>
                  <AvatarBadge boxSize="1.25em" bg="red.500">
                    <Text fontSize="12px">9+</Text>
                  </AvatarBadge>
                </Avatar>
              </>
            }
          />

          <DashBoardHome />
        </Flex>
      </Flex> */}
    </>
  );
};

export default TeacherDashboard;
