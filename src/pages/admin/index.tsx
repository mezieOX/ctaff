import {
  Box,
  Icon,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { SiGoogleanalytics } from "react-icons/si";
import { FaChalkboardTeacher } from "react-icons/fa";
import { BsClipboard } from "react-icons/bs";
import { HiUsers } from "react-icons/hi";
import { MdWork } from "react-icons/md";
import AdminNav from "@/components/admin/nav";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";
import axios from 'axios'
import {setCookieToResponseHeader} from "@/utils/cookieHandler/setCookie";

const dData = [
  {
    title: "View users analytics",
    href: "/admin/analytics",
    icon: SiGoogleanalytics,
    iconColor: "purple",
  },
  {
    title: "View pending teacher applicants",
    href: "/admin/view_teacher_applicants",
    icon: MdWork,
    iconColor: "black",
  },
  {
    title: "View all recruited teachers",
    href: "/admin/view_recruited_teachers",
    icon: FaChalkboardTeacher,
    iconColor: "green",
  },
  {
    title: "View all schools/teacher_finders",
    // href: "/admin/teacher_finders",
    href: "#",
    icon: HiUsers,
    iconColor: "blue",
  },
  {
    title: "View all teacher orders",
    // href: "/admin/teacher_finders",
    href: "#",
    icon: BsClipboard,
    iconColor: "blue",
  },
];

              
const AdminDashboard = () => {

  const router = useRouter()
  const go_to = (href: string) => {
    router.push(href)
  }

    return (
      <Box position="relative">
        <AdminNav />
        <Box
          // shadow="1px 3px 16px 4px rgba(1,1,1,0.1);"
          minHeight="100vh"
          mx="auto"
          my="4rem"
          w="80%"
        >
          <SimpleGrid columns={{base: 1, md: 2, lg: 3}} spacing="2rem">
            {dData.map((item, index) => (
              <Box
                userSelect="none"
                key={index}
                onClick={() => go_to(item.href)}
                cursor="pointer"
                mt="3rem"
                display="flex"
                flexDir="column"
                alignItems="center"
                textAlign="center"
                justifyContent="center"
                rounded="lg"
                // width={{ base: "100%", md: "40%", lg: "30%", xl: "25%" }}
                w="auto"
                height="17rem"
                fontWeight="500"
                fontSize={{ base: "1rem", md: "1.5rem" }}
                px="10px"
                transition=".3s"
                _hover={{
                  bg: "#a08db5",
                  color: "white",
                  "& .icon": { color: "white" },
                }}

                shadow="1px 3px 16px 4px rgba(1,1,1,0.1);"
              >
                <Icon as={item.icon} color={item.iconColor} className="icon"/>
                <Text>
                  {item.title}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Box>
    );
}
 
export default AdminDashboard;

// export async function getServerSideProps(context: any) {
//   const { req, res } = context;
//   const { cookies } = req;
//   const { refreshToken, accessToken } = cookies;

//   const url = process.env.API_URL;

//   if (refreshToken && accessToken) {
//     let rtPload: any = jwt_decode(refreshToken);
//     let atPload: any = jwt_decode(accessToken);

//     if (rtPload && atPload) {
//       const expirationDate = new Date(rtPload.exp * 1000);

//       const currentDate = new Date();

//       const twoDaysRemaining = new Date(expirationDate);
//       twoDaysRemaining.setDate(expirationDate.getDate() - 2);

//       if (currentDate >= twoDaysRemaining && currentDate <= expirationDate) {
//         const resp = await axios.get(`${url}/auth/isValidCookieTokens`, {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             refresh_token: refreshToken,
//           },
//         });

//         if(resp.data.role !== "admin"){
//           return {
//             redirect: {
//               destination: "/admin/login",
//               permanent: false,
//             },
//           };  
//         }

//         const { authorization, refresh_token } = resp.headers;
//         const aT = authorization.replace("Bearer", "").trim();

//         await setCookieToResponseHeader(res, refresh_token, aT)

//         return {
//           props: {},
//         };
//       } else if(currentDate <= expirationDate){
//         return {
//           props: {},
//         };
//       }
//     } else {
//       return {
//         redirect: {
//           destination: "/admin/login",
//           permanent: false,
//         },
//       };
//     }
//   }
//   return {
//     redirect: {
//       destination: "/admin/login",
//       permanent: false,
//     },
//   };
// }