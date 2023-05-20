import { NextPage } from "next";
import DashBoardHome from "../../../components/teacherDashboard/dashboardHome";
import DashBoardLayout from "../../../components/teacherDashboard/";

const TeacherDashboard: NextPage = () => {

  return (
    <>
    <DashBoardLayout pageTitle="My Dashboard">
      <DashBoardHome/>
      </DashBoardLayout>
    </>
  );
};

export default TeacherDashboard;
