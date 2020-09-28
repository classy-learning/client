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
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext, useState } from "react";

import { API } from "aws-amplify";
import EnrollmentSteps from "bits/customer/EnrollmentSteps";
import Prices from "bits/customer/Prices";
import StudentContext from "bits/customer/StudentContext";

const Dashboard = (props) => {
  const student = useContext(StudentContext);

  // TODO: setCompletedSteps based on subscription status and first lesson status
  // TODO: if all steps are completed, show regular dashboard instead of steps

  const [awaitingRedirect, setAwaitingRedirect] = useState(false);

  const [cardElementFocused, setCardElementFocused] = useState(false);
  const [cardElementComplete, setCardElementComplete] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const canSubmit = stripe && elements && cardElementComplete;

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
            <Header>Purchase a subscription</Header>
            <Segment padded>
              <Prices></Prices>
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
              <Form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!canSubmit) {
                    return;
                  }

                  setAwaitingRedirect(true);

                  const {
                    error,
                    paymentMethod,
                  } = await stripe.createPaymentMethod({
                    type: "card",
                    card: elements.getElement(CardElement),
                  });

                  if (error) {
                    // TODO: display errors somewhere in the form
                    console.log(error);
                    setAwaitingRedirect(false);
                    return;
                  }

                  API.get("stripe", "/subscription", {
                    queryStringParameters: {
                      paymentMethodId: paymentMethod.id,
                      studentAccountId: student.id,
                    },
                    response: true,
                  })
                    .then((response) => {
                      console.log(response);
                      setAwaitingRedirect(false);
                    })
                    .catch((error) => {
                      // TODO: display errors somewhere in the form
                      console.log(error);
                      setAwaitingRedirect(false);
                    });
                }}
              >
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
                    onChange={(e) => {
                      setCardElementComplete(e.complete);
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
                  disabled={!canSubmit}
                  fluid
                  icon="credit card"
                  labelPosition="left"
                  loading={awaitingRedirect}
                  secondary
                  size="large"
                  type="submit"
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
