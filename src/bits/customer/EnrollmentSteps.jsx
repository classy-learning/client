import React, { useContext, useState } from "react";

import PropTypes from "prop-types";
import { Step } from "semantic-ui-react";
import StudentContext from "bits/customer/StudentContext";

const BILLING_STEP = "Billing";
const BOOKING_STEP = "Booking";
const ENROLLMENT_STEP = "Enrollment";

const EnrollmentSteps = (props) => {
  const student = useContext(StudentContext);

  const [completedSteps, setCompletedSteps] = useState([ENROLLMENT_STEP]);

  const steps = [
    {
      title: ENROLLMENT_STEP,
      description: `Register ${student.givenName}'s account.`,
      props: {},
    },
    {
      title: BILLING_STEP,
      description: `Start a subscription plan.`,
      props: { active: true },
    },
    {
      title: BOOKING_STEP,
      description: `Schedule ${student.givenName}'s first lesson.`,
      props: {},
    },
  ];

  return (
    <Step.Group ordered size="mini" widths={steps.length}>
      {steps.map((step) => (
        <Step
          {...step.props}
          completed={completedSteps.includes(step.title)}
          key={step.title}
        >
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
