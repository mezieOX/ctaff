import { NextPage } from "next";
import DashBoardLayout from "../../../components/teacherDashboard/";
import ProfilePage from "../../../components/teacherDashboard/profile";
import { setCookieToResponseHeader } from "@/utils/cookieHandler/setCookie";
import { deleteTokensInCookies } from "@/utils/cookieHandler/deleteCookie";
import axios from "axios";
import {useState} from 'react'

const TeacherProfile = ({ teacherData }: { teacherData: any }) => {
  const [sidebarTeacherData, setSidebarTeacherData] = useState(null);

  return (
    <DashBoardLayout teacherData={sidebarTeacherData || teacherData} pageTitle="Profile">
      <ProfilePage teacherData={teacherData} setSidebarTeacherData={setSidebarTeacherData}/>
    </DashBoardLayout>
  );
};

export default TeacherProfile;

export async function getServerSideProps(context: any) {
  const { req, res } = context;
  const { cookies } = req;
  const { refreshToken, accessToken } = cookies;
  const url = process.env.API_URL;

  try {
    const resp = await axios.get(`${url}/users/getUserDashboardDetails`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        refresh_token: refreshToken,
      },
    });

    const { authorization, refresh_token } = resp.headers;
    const aT = authorization.replace("Bearer", "").trim();
    await setCookieToResponseHeader(res, refresh_token, aT);

    return {
      props: {
        teacherData: resp.data,
      },
    };
  } catch (err: any) {
    if (err?.response?.status === 403 || err?.response?.status === 401) {
      await deleteTokensInCookies(res);

      return {
        redirect: {
          destination: `/login`,
          permanent: true,
        },
      };
    }
    return {
      props: {},
    };
  }
}
