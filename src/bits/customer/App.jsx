import { Dropdown, Menu } from "semantic-ui-react";
import { Link, Route, Switch } from "react-router-dom";

import Account from "bits/customer/Account";
import Enroll from "bits/customer/Enroll";
import Home from "bits/customer/Home";
import Page from "bits/Page";
import React from "react";
import Student from "bits/customer/Student";

const App = (props) => {
  // TODO: get students from api
  // TODO: set students context
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
          <Dropdown className="link item" text="Students">
            <Dropdown.Menu>
              <Dropdown.Header>Students</Dropdown.Header>
              <Dropdown.Divider></Dropdown.Divider>
              <Dropdown.Item
                as={Link}
                icon="add user"
                key="enroll"
                text="Enroll"
                to="/enroll"
              ></Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
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
        <Route path="/enroll">
          <Enroll></Enroll>
        </Route>
        <Route path="/student/:studentId">
          <Student></Student>
        </Route>
      </Switch>
    </Page>
  );
};

export default App;
