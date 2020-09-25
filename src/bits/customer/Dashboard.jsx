import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Input,
  List,
  Popup,
  Segment,
  Statistic,
  Step,
} from "semantic-ui-react";
import React, { useContext, useState } from "react";

import { API } from "aws-amplify";
import { CardElement } from "@stripe/react-stripe-js";
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
  const [cardElementFocused, setCardElementFocused] = useState(false);

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
      price: "$10",
      unit: "flat rate",
      popupContent: `This flat fee secures ${student.givenName}'s fully-configured virtual desktop.`,
    },
    {
      key: "lesson",
      price: "$50",
      unit: "per lesson",
      popupContent: `We pay competetively hourly rates to attract top-quality instructors.`,
    },
    {
      key: "desktop hour",
      price: "$1",
      unit: "per desktop hour",
      popupContent: `Connect from anywhere. Pay only for what ${student.givenName} uses each month.`,
    },
  ];

  // TODO: get checkout session from stripe using stripeCustomerId
  return (
    <Grid container>
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
          <Segment padded>
            <Header>Purchase a subscription</Header>
            <Segment padded>
              <Statistic.Group size="mini" widths={priceStats.length}>
                {priceStats.map((stat) => (
                  <Statistic key={stat.key}>
                    <Statistic.Value>{stat.price}</Statistic.Value>
                    <Statistic.Label>
                      {stat.unit}{" "}
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
            <Segment padded raised>
              <Header>
                Enter your card details.
                <Header.Subheader>{`${student.givenName}'s subscription will start right away.`}</Header.Subheader>
              </Header>
              <List>
                <List.Item>
                  <List.Icon name="arrow right"></List.Icon>
                  <List.Content>
                    Total due now: <strong>$10</strong>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="arrow right"></List.Icon>
                  <List.Content>
                    Billed monthly, no long-term commitments
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="arrow right"></List.Icon>
                  <List.Content>
                    Pay only for what {student.givenName} uses each month
                  </List.Content>
                </List.Item>
              </List>
              <Form>
                <Form.Field
                  className={
                    cardElementFocused
                      ? "CardElementField CardElementField_focus"
                      : "CardElementField"
                  }
                >
                  <Form.Input
                    as={CardElement}
                    onBlur={() => {
                      setCardElementFocused(false);
                    }}
                    onFocus={() => {
                      setCardElementFocused(true);
                    }}
                    options={{
                      style: {
                        base: {
                          color: "rgba(0,0,0,.87)",
                          fontFamily:
                            "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif",
                          fontSmoothing: "antialiased",
                          fontSize: "16px",
                          "::placeholder": {
                            color: "#aab7c4",
                          },
                        },
                        invalid: {
                          color: "#fa755a",
                          iconColor: "#fa755a",
                        },
                      },
                    }}
                  ></Form.Input>
                </Form.Field>
                <Button
                  content={`Start ${student.givenName}'s subscription`}
                  fluid
                  icon="credit card"
                  labelPosition="left"
                  loading={awaitingRedirect}
                  onClick={() => {
                    setAwaitingRedirect(true);
                    // API.get("stripe", "/checkoutPortalSession", {
                    //   queryStringParameters: {
                    //     studentUsername: student.username,
                    //   },
                    //   response: true,
                    // })
                    //   .then((response) => {
                    //     setAwaitingRedirect(false);
                    //     console.log(response);
                    //   })
                    //   .catch((error) => {
                    //     console.log(error);
                    //     setAwaitingRedirect(false);
                    //   });
                  }}
                  secondary
                  size="large"
                ></Button>
              </Form>
            </Segment>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Dashboard;
