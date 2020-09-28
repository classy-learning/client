import React, { useContext, useState } from "react";

import StudentContext from "bits/customer/StudentContext";
import StudentSetup from "bits/customer/StudentSetup";

const Dashboard = (props) => {
  const student = useContext(StudentContext);

  // TODO: replace "false" with condition checking if a first lesson has been scheduled
  const setupCompleted = student.subscriptionStatus && false;

  return setupCompleted ? <div>Dashboard</div> : <StudentSetup></StudentSetup>;
};

export default Dashboard;
