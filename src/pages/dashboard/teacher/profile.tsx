import { NextPage } from "next";
import DashBoardLayout from "../../../components/teacherDashboard/";
import ProfilePage from "../../../components/teacherDashboard/profile";

const TeacherProfile: NextPage = () => {

  return (
    <DashBoardLayout pageTitle="Profile">
      <ProfilePage/>
      </DashBoardLayout>
  );
};

export default TeacherProfile;
