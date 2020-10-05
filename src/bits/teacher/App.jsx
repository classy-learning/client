import { Dropdown, Menu } from "semantic-ui-react";
import { Link, Route, Switch } from "react-router-dom";

import Account from "bits/teacher/Account";
import Home from "bits/teacher/Home";
import Lessons from "bits/teacher/Lessons";
import Page from "bits/Page";
import React from "react";

const App = (props) => {
  return (
    <Page
      menu={
        <Menu.Menu>
          <Menu.Item as={Link} to="/">
            Home
          </Menu.Item>
          <Menu.Item as={Link} to="/account">
            Account
          </Menu.Item>
          <Menu.Item as={Link} to="/lessons">
            Lessons
          </Menu.Item>
        </Menu.Menu>
      }
    >
      <Switch>
        <Route exact path="/">
          <Home></Home>
        </Route>
        <Route path="/account">
          <Account></Account>
        </Route>
        <Route path="/lessons">
          <Lessons></Lessons>
        </Route>
      </Switch>
    </Page>
  );
};

export default App;
