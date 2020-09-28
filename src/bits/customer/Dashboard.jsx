import { Grid, Segment } from "semantic-ui-react";
import React, { useContext } from "react";

import Checkout from "bits/customer/Checkout";
import EnrollmentSteps from "bits/customer/EnrollmentSteps";
import StudentContext from "bits/customer/StudentContext";

const Dashboard = (props) => {
  const student = useContext(StudentContext);

  // TODO: setCompletedSteps based on subscription status and first lesson status
  // TODO: if all steps are completed, show regular dashboard instead of steps

  return (
    <Grid container>
      <Grid.Row>
        <Grid.Column>
          <EnrollmentSteps></EnrollmentSteps>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Segment padded>
            <Checkout></Checkout>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Dashboard;
