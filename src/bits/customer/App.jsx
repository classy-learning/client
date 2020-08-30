import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import Page from "bits/Page";
import React from "react";

const App = (props) => {
  // TODO: add student dropdown to menu
  // TODO: implement customer app routing
  return (
    <Page
      menu={
        <Menu.Menu>
          <Menu.Item as={Link} to="/account">
            Account
          </Menu.Item>
        </Menu.Menu>
      }
    >
      <p>Customer</p>
    </Page>
  );
};

export default App;
