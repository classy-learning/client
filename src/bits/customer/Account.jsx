import { Button, Grid, Header } from "semantic-ui-react";

import { API } from "aws-amplify";
import React from "react";

const Account = (props) => {
  return (
    <Grid container padded>
      <Grid.Column>
        <Grid.Row>
          <Header>Account</Header>
          <p>
            Manage subscriptions and view past billing statements using our
            secure billing portal.
          </p>
          <Button
            content="Visit secure billing portal"
            icon="right arrow"
            labelPosition="right"
            onClick={() => {
              console.log("go to billing portal");
              API.get("stripe", "/billingPortalSession", { response: true })
                .then((response) => {
                  console.log(response);
                })
                .catch((error) => console.log(error));
            }}
            secondary
          ></Button>
        </Grid.Row>
      </Grid.Column>
    </Grid>
  );
};

export default Account;
