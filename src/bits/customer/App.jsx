import { API, graphqlOperation } from "aws-amplify";
import { Dropdown, Menu } from "semantic-ui-react";
import { Link, Route, Switch } from "react-router-dom";
import React, { useEffect, useState } from "react";

import Account from "bits/customer/Account";
import Enroll from "bits/customer/Enroll";
import Home from "bits/customer/Home";
import Page from "bits/Page";
import Student from "bits/customer/Student";
import { StudentsProvider } from "bits/customer/StudentsContext";
import listStudentAccounts from "bits/customer/listStudentAccounts";

const App = (props) => {
  // TODO: refresh studentAccounts when you enroll a new student
  // TODO: refresh studentAccounts when you subscribe a newly enrolled student
  // TODO: refresh studentAccounts when you book a new lesson
  const [studentAccounts, setStudentAccounts] = useState();

  const fetchStudentAccounts = () =>
    API.graphql(graphqlOperation(listStudentAccounts))
      .then((response) => {
        const accounts = response.data.listStudentAccounts.items.map((item) => {
          return {
            id: item.id,
            username: item.studentUser.Username,
            givenName: item.studentUser.UserAttributes.filter(
              (attribute) => attribute.Name === "given_name"
            )[0].Value,
            familyName: item.studentUser.UserAttributes.filter(
              (attribute) => attribute.Name === "family_name"
            )[0].Value,
            picture: item.studentUser.UserAttributes.filter(
              (attribute) => attribute.Name === "picture"
            )[0].Value,
            subscriptionStatus: item.stripeSubscription?.status,
          };
        });
        console.log(accounts);
        setStudentAccounts(accounts);
      })
      .catch((error) => {
        console.log(error);
      });

  useEffect(() => {
    fetchStudentAccounts();
  }, []);

  // TODO: make sure dropdown fits contents
  return (
    <StudentsProvider
      value={{
        data: studentAccounts,
        refresh: () => {
          fetchStudentAccounts();
        },
      }}
    >
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
                {studentAccounts?.map((studentAccount) => (
                  <Dropdown.Item
                    as={Link}
                    key={studentAccount.username}
                    text={`${studentAccount.givenName}`}
                    to={`student/${studentAccount.username}`}
                    image={{
                      avatar: true,
                      src: studentAccount.picture,
                    }}
                  ></Dropdown.Item>
                ))}
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
          <Route path="/student/:studentUsername">
            <Student></Student>
          </Route>
        </Switch>
      </Page>
    </StudentsProvider>
  );
};

export default App;
