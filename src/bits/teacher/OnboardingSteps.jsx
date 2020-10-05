import PropTypes from "prop-types";
import React from "react";
import { Step } from "semantic-ui-react";

const OnboardingSteps = (props) => {
  return (
    <Step.Group ordered size="mini" widths={4}>
      {[
        {
          description: `Get hired.`,
          props: {
            active: false,
            completed: true,
            key: "Hiring",
          },
          title: "Hiring",
        },
        {
          description: `Set availability.`,
          props: {
            active: true,
            completed: false,
            key: "Scheduling",
          },
          title: "Scheduling",
        },
        {
          description: `Add bank info.`,
          props: {
            active: false,
            completed: false,
            key: "Banking",
          },
          title: "Banking",
        },
        {
          description: `Start teaching.`,
          props: {
            active: false,
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

export default OnboardingSteps;
