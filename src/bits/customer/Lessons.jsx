import { Button, Grid, Header, Icon, Segment } from "semantic-ui-react";
import React, { useContext, useState } from "react";

import StudentContext from "bits/customer/StudentContext";

const Lessons = (props) => {
  const student = useContext(StudentContext);

  const [upcomingLessons, setUpcomingLessons] = useState();
  const [pastLessons, setPastLessons] = useState();

  return (
    <Segment basic padded>
      <Grid container divided="vertically" padded>
        <Grid.Row>
          <Grid.Column textAlign="center">
            {upcomingLessons ? (
              <div>Lessons</div>
            ) : (
              <Grid container padded>
                <Grid.Row>
                  <Grid.Column>
                    <Header as="h6" disabled icon>
                      <Icon name="calendar alternate"></Icon>
                      <Header.Subheader>
                        No upcoming lessons (yet).
                      </Header.Subheader>
                    </Header>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <Button secondary>Book a lesson</Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            )}
          </Grid.Column>
        </Grid.Row>
        {pastLessons ? (
          <Grid.Row>
            <Grid.Column>Past Lessons</Grid.Column>
          </Grid.Row>
        ) : (
          <div></div>
        )}
      </Grid>
    </Segment>
  );
};

export default Lessons;
