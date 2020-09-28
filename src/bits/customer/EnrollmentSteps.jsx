import React, { useContext } from "react";

import { Step } from "semantic-ui-react";
import StudentContext from "bits/customer/StudentContext";

const EnrollmentSteps = (props) => {
  const student = useContext(StudentContext);

  return (
    <Step.Group ordered size="mini" widths={3}>
      {[
        {
          active: false,
          completed: true,
          description: `Register ${student.givenName}'s account.`,
          key: "Enrollment",
          title: "Enrollment",
        },
        {
          active: !student.subscriptionStatus,
          completed: student.subscriptionStatus,
          description: `Start a subscription plan.`,
          key: "Billing",
          title: "Billing",
        },
        {
          active: student.subscriptionStatus == true,
          description: `Schedule ${student.givenName}'s first lesson.`,
          key: "Booking",
          title: "Booking",
        },
      ].map((step) => (
        <Step {...step}>
          <Step.Content>
            <Step.Title>{step.title}</Step.Title>
            <Step.Description>{step.description}</Step.Description>
          </Step.Content>
        </Step>
      ))}
    </Step.Group>
  );
};

export default EnrollmentSteps;
