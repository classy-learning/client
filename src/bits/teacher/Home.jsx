import React from "react";
import TeacherSetup from "bits/teacher/TeacherSetup";

const Home = (props) => {
  const onboardingCompleted = false;

  return onboardingCompleted ? <div>Home</div> : <TeacherSetup></TeacherSetup>;
};

export default Home;
