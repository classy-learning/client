import { Grid, Segment } from "semantic-ui-react";
import React, { useContext } from "react";

import Booking from "bits/customer/Booking";
import Checkout from "bits/customer/Checkout";
import EnrollmentSteps from "bits/customer/EnrollmentSteps";
import StudentContext from "bits/customer/StudentContext";

const StudentSetup = (props) => {
  const student = useContext(StudentContext);

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
            {student.subscriptionStatus ? (
              <Booking></Booking>
            ) : (
              <Checkout></Checkout>
            )}
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default StudentSetup;
