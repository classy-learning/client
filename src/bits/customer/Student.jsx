import { Grid, Image, Loader, Menu } from "semantic-ui-react";
import {
  Link,
  Route,
  Switch,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";

import Dashboard from "bits/customer/Dashboard";
import Lessons from "bits/customer/Lessons";
import Projects from "bits/customer/Projects";
import Stats from "bits/customer/Stats";
import { StudentProvider } from "bits/customer/StudentContext";
import StudentsContext from "bits/customer/StudentsContext";

const Student = (props) => {
  const studentAccounts = useContext(StudentsContext);
  const location = useLocation();
  const { path, url } = useRouteMatch();
  const { studentUsername } = useParams();

  const [student, setStudent] = useState();

  useEffect(() => {
    if (studentAccounts === undefined) {
      return;
    }
    setStudent(
      studentAccounts.filter(
        (account) => account.username === studentUsername
      )[0]
    );
  }, [studentAccounts, studentUsername]);

  return student === undefined ? (
    <Loader active inline="centered"></Loader>
  ) : (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Menu borderless pointing>
            <Menu.Item header>
              <Image
                circular
                size="mini"
                src={student?.picture}
                style={{ marginRight: "1rem" }}
              />
              {student?.givenName}
            </Menu.Item>
            <Menu.Menu position="right">
              <Menu.Item
                as={Link}
                to={`${url}`}
                active={location.pathname === `/student/${studentUsername}`}
              >
                Dashboard
              </Menu.Item>
              <Menu.Item
                as={Link}
                to={`${url}/lessons`}
                active={
                  location.pathname === `/student/${studentUsername}/lessons`
                }
              >
                Lessons
              </Menu.Item>
              <Menu.Item
                as={Link}
                to={`${url}/projects`}
                active={
                  location.pathname === `/student/${studentUsername}/projects`
                }
              >
                Projects
              </Menu.Item>
              <Menu.Item
                as={Link}
                to={`${url}/stats`}
                active={
                  location.pathname === `/student/${studentUsername}/stats`
                }
              >
                Stats
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <StudentProvider value={student}>
            <Switch>
              <Route exact path={path}>
                <Dashboard></Dashboard>
              </Route>
              <Route path={`${path}/lessons`}>
                <Lessons></Lessons>
              </Route>
              <Route path={`${path}/projects`}>
                <Projects></Projects>
              </Route>
              <Route path={`${path}/stats`}>
                <Stats></Stats>
              </Route>
            </Switch>
          </StudentProvider>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Student;
