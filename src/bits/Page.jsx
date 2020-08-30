import { Button, Grid, Header, Menu } from "semantic-ui-react";

import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
import signOut from "bits/signOut";

const Page = (props) => {
  return (
    <Grid container style={{ paddingTop: "1rem" }}>
      <Grid.Row>
        <Grid.Column>
          <Grid verticalAlign="middle">
            <Grid.Column computer={2} floated="left" mobile={5} tablet={2}>
              <Header as={Link} size="huge" to="/">
                Classy
              </Header>
            </Grid.Column>
            <Grid.Column
              computer={14}
              floated="right"
              mobile={11}
              tablet={14}
              textAlign="right"
            >
              <Menu compact secondary>
                {props.menu}
                <Menu.Item>
                  <Button onClick={(e) => signOut(e)} secondary>
                    Sign out
                  </Button>
                </Menu.Item>
              </Menu>
            </Grid.Column>
          </Grid>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>{props.children}</Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>Footer</Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

Page.propTypes = {
  children: PropTypes.element.isRequired,
  menu: PropTypes.element,
};

export default Page;
