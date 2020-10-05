import { Grid, Segment } from "semantic-ui-react";
import React, { useState } from "react";

import Banking from "bits/teacher/Banking";
import Confirmation from "bits/teacher/Confirmation";
import OnboardingSteps from "bits/teacher/OnboardingSteps";
import PropTypes from "prop-types";
import Scheduling from "bits/teacher/Scheduling";

const TeacherSetup = (props) => {
  const [currentStep, setCurrentStep] = useState("Scheduling");

  return (
    <Grid container>
      <Grid.Row>
        <Grid.Column>
          <OnboardingSteps></OnboardingSteps>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Segment padded>
            {currentStep === "Scheduling" ? (
              <Scheduling></Scheduling>
            ) : currentStep === "Banking" ? (
              <Banking></Banking>
            ) : (
              <Confirmation></Confirmation>
            )}
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default TeacherSetup;
