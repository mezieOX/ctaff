import { NextPage } from "next";
import DashBoardLayout from "../../../components/teacherDashboard/";
import PasswordReset from "../../../components/teacherDashboard/password-reset";

const TeacherPasswordReset: NextPage = () => {

  return (
    <DashBoardLayout pageTitle="Reset Password">
      <PasswordReset/>
      </DashBoardLayout>
  );
};

export default TeacherPasswordReset;
