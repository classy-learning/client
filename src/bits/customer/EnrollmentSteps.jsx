import React, { useContext } from "react";

import { Step } from "semantic-ui-react";
import StudentContext from "bits/customer/StudentContext";

const EnrollmentSteps = (props) => {
  const student = useContext(StudentContext);

  const isBillingComplete = () => student.subscriptionStatus === "active";
  const isBookingComplete = () => false;

  return (
    <Step.Group ordered size="mini" widths={4}>
      {[
        {
          description: `Make an account`,
          props: {
            active: false,
            completed: true,
            key: "Enrollment",
          },
          title: "Enrollment",
        },
        {
          description: `Start a plan`,
          props: {
            active: !isBillingComplete,
            completed: isBillingComplete,
            key: "Billing",
          },
          title: "Billing",
        },
        {
          description: `Book a lesson`,
          props: {
            active: isBillingComplete && !isBookingComplete,
            completed: isBookingComplete,
            key: "Booking",
          },
          title: "Booking",
        },
        {
          description: `Start learning`,
          props: {
            active: student.subscriptionStatus === "active",
            key: "Confirmation",
          },
          title: "Confirmation",
        },
      ].map((step) => (
        <Step {...step.props}>
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
