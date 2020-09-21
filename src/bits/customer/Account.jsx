import { Button, Grid, Header } from "semantic-ui-react";
import React, { useState } from "react";

import { API } from "aws-amplify";

const Account = (props) => {
  const [awaitingRedirect, setAwaitingRedirect] = useState(false);

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
            loading={awaitingRedirect}
            onClick={() => {
              setAwaitingRedirect(true);
              API.get("stripe", "/billingPortalSession", { response: true })
                .then((response) => {
                  window.location.href = response.data;
                })
                .catch((error) => {
                  console.log(error);
                  setAwaitingRedirect(false);
                });
            }}
            secondary
          ></Button>
        </Grid.Row>
      </Grid.Column>
    </Grid>
  );
};

export default Account;
