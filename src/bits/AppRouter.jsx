import CustomerApp from "bits/customer/App";
import React from "react";
import StudentApp from "bits/student/App";
import TeacherApp from "bits/teacher/App";

const AppRouter = (props) => {
  // const group = user.signInUserSession.accessToken.payload["cognito:groups"][0];
  const group = "customers"; // TODO: determine actual group
  return group === "customers" ? (
    <CustomerApp></CustomerApp>
  ) : group === "students" ? (
    <StudentApp></StudentApp>
  ) : group === "teachers" ? (
    <TeacherApp></TeacherApp>
  ) : (
    <p>Whoops...</p>
  );
};

export default AppRouter;
