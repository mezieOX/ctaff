import axios from "axios";
import DashBoardHome from "../../../components/teachFinderDashboard/dashboardHome";
import { setCookieToResponseHeader } from "@/utils/cookieHandler/setCookie";
import { deleteTokensInCookies } from "@/utils/cookieHandler/deleteCookie";
import TeacherFinderDashBoardLayout from "@/components/teachFinderDashboard";

const TeacherFinderDashboard = ({ tfData }: { tfData: any }) => {
  return (
    <TeacherFinderDashBoardLayout tfData={tfData} pageTitle="My Dashboard">
      <DashBoardHome tfData={tfData} />
    </TeacherFinderDashBoardLayout>
  );
};

export default TeacherFinderDashboard;

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
        tfData: resp.data,
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
