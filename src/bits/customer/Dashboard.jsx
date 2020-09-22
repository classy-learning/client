import {
  Button,
  Grid,
  Icon,
  Popup,
  Segment,
  Statistic,
  Step,
} from "semantic-ui-react";
import React, { useContext, useState } from "react";

import { API } from "aws-amplify";
import StudentContext from "bits/customer/StudentContext";

const BILLING_STEP = "Billing";
const BOOKING_STEP = "Booking";
const ENROLLMENT_STEP = "Enrollment";

const Dashboard = (props) => {
  const student = useContext(StudentContext);

  // TODO: setCompletedSteps based on subscription status and first lesson status
  // TODO: if all steps are completed, show regular dashboard instead of steps

  const [awaitingRedirect, setAwaitingRedirect] = useState(false);
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

  const priceStats = [
    {
      key: "subscription",
      price: "10",
      unit: "month",
      popupContent: `This flat fee secures ${student.givenName}'s fully-configured virtual desktop.`,
    },
    {
      key: "lesson",
      price: "50",
      unit: "lesson",
      popupContent: `We pay competetively hourly rates to attract top-quality instructors.`,
    },
    {
      key: "desktop hour",
      price: "1",
      unit: "desktop hour",
      popupContent: `Connect from anywhere. Pay only for what ${student.givenName} uses each month.`,
    },
  ];

  // TODO: get checkout session from stripe using stripeCustomerId
  return (
    <Segment basic padded>
      <Grid container padded>
        <Grid.Row>
          <Grid.Column>
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
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Segment basic padded>
              <Segment basic padded>
                <Statistic.Group size="mini" widths={priceStats.length}>
                  {priceStats.map((stat) => (
                    <Statistic key={stat.key}>
                      <Statistic.Value>${stat.price}</Statistic.Value>
                      <Statistic.Label>
                        per {stat.unit}{" "}
                        <Popup
                          content={stat.popupContent}
                          position="top center"
                          trigger={<Icon name="info circle"></Icon>}
                        ></Popup>
                      </Statistic.Label>
                    </Statistic>
                  ))}
                </Statistic.Group>
              </Segment>
              <Button
                content={`Get ${student.givenName} started for $10/month`}
                fluid
                icon="right arrow"
                labelPosition="right"
                loading={awaitingRedirect}
                onClick={() => {
                  setAwaitingRedirect(true);
                  API.get("stripe", "/checkoutPortalSession", {
                    response: true,
                  })
                    .then((response) => {
                      setAwaitingRedirect(false);
                      console.log(response);
                    })
                    .catch((error) => {
                      console.log(error);
                      setAwaitingRedirect(false);
                    });
                }}
                secondary
                size="large"
              ></Button>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default Dashboard;
