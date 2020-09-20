import React, { useContext, useEffect, useState } from "react";

import { AmplifyContainer } from "@aws-amplify/ui-react";
import CustomerApp from "bits/customer/App";
import { Loader } from "semantic-ui-react";
import StudentApp from "bits/student/App";
import TeacherApp from "bits/teacher/App";
import UserContext from "bits/UserContext";

const AppRouter = (props) => {
  const user = useContext(UserContext);
  const [group, setGroup] = useState();

  useEffect(() => {
    setGroup(user.signInUserSession.accessToken.payload["cognito:groups"][0]);
  }, [user]);

  return group === "Customers" ? (
    <CustomerApp></CustomerApp>
  ) : group === "Students" ? (
    <StudentApp></StudentApp>
  ) : group === "Teachers" ? (
    <TeacherApp></TeacherApp>
  ) : (
    <AmplifyContainer>
      <Loader active inline="centered" size="huge"></Loader>
    </AmplifyContainer>
  );
};

export default AppRouter;
