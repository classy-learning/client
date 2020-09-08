import React, { useContext } from "react";

import CustomerApp from "bits/customer/App";
import StudentApp from "bits/student/App";
import TeacherApp from "bits/teacher/App";
import UserContext from "bits/UserContext";

const AppRouter = (props) => {
  const user = useContext(UserContext);
  // const group = user.signInUserSession.accessToken.payload["cognito:groups"][0];
  const group = "customers"; // TODO: debug above line and use that instead
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
