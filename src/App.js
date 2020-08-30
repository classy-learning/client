import AppRouter from "bits/AppRouter";
import AuthWrapper from "bits/AuthWrapper";
import CustomerApp from "bits/customer/App";
import React from "react";
import StudentApp from "bits/student/App";
import TeacherApp from "bits/teacher/App";

function App() {
  return (
    <AuthWrapper>
      <AppRouter></AppRouter>
    </AuthWrapper>
  );
}

export default App;
