import { Grid, Image, Menu } from "semantic-ui-react";
import {
  Link,
  Route,
  Switch,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import React, { useState } from "react";

import Lessons from "bits/customer/Lessons";
import Projects from "bits/customer/Projects";
import PropTypes from "prop-types";
import Stats from "bits/customer/Stats";

const Student = (props) => {
  const location = useLocation();
  const { path, url } = useRouteMatch();
  const { studentId } = useParams();
  const [student, setStudent] = useState({
    img: "https://react.semantic-ui.com/images/avatar/small/laura.jpg",
    name: "Laura",
  });
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Menu borderless pointing>
            <Menu.Item header>
              <Image
                circular
                size="mini"
                src={student.img}
                style={{ marginRight: "1rem" }}
              />
              {student.name}
            </Menu.Item>
            <Menu.Menu position="right">
              <Menu.Item
                as={Link}
                to={`${url}`}
                active={location.pathname === `/student/${studentId}`}
              >
                Home
              </Menu.Item>
              <Menu.Item
                as={Link}
                to={`${url}/lessons`}
                active={location.pathname === `/student/${studentId}/lessons`}
              >
                Lessons
              </Menu.Item>
              <Menu.Item
                as={Link}
                to={`${url}/projects`}
                active={location.pathname === `/student/${studentId}/projects`}
              >
                Projects
              </Menu.Item>
              <Menu.Item
                as={Link}
                to={`${url}/stats`}
                active={location.pathname === `/student/${studentId}/stats`}
              >
                Stats
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Switch>
            <Route exact path={path}>
              {student.name}
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
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Student;
