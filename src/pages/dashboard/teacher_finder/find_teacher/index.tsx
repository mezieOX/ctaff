import { NextPage } from "next";
import FindTeacher from "../../../../components/teachFinderDashboard/find_teacher";
import { setCookieToResponseHeader } from "@/utils/cookieHandler/setCookie";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { deleteTokensInCookies } from "@/utils/cookieHandler/deleteCookie";
import { NextApiRequest, NextApiResponse } from "next";
import TeacherFinderDashBoardLayout from "@/components/teachFinderDashboard";

const FindTeacherPage = ({teachers}: {teachers: any}) => {
  return (
    <TeacherFinderDashBoardLayout
      tfData={teachers.tfData}
      pageTitle="My Dashboard"
    >
      <FindTeacher teachers={teachers.filteredTData} />
    </TeacherFinderDashBoardLayout>
  );
};

export default FindTeacherPage;


export async function getServerSideProps({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  const url = process.env.API_URL;
  const { cookies } = req;
  const { refreshToken, accessToken } = cookies;
  try {
    const resp = await axios.get(`${url}/users/getTeacherApplicants?f=available&u=teacher_finder`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        refresh_token: refreshToken,
      },
    });
    const { authorization, refresh_token } = resp.headers;
    const aT = authorization.replace("Bearer", "").trim();

    await setCookieToResponseHeader(res, refresh_token, aT);

    console.log('reeee', resp.data)
    return {
      props: {
        teachers: resp.data,
      },
    };
  } catch (err: any) {
    if (err?.response?.status === 403 || err?.response?.status === 401) {
      await deleteTokensInCookies(res);

      return {
        redirect: {
          destination: `/admin/login`,
          permanent: true,
        },
      };
    }
    return {
      props: {
        teachers: [],
      },
    };
  }
}
