import {
  Button,
  Divider,
  Dropdown,
  Grid,
  Header,
  Icon,
  Input,
  Item,
  Label,
  List,
  Segment,
} from "semantic-ui-react";
import React, { useContext } from "react";

import StudentContext from "bits/customer/StudentContext";

// TODO: get instructors from api
const instructors = [
  {
    key: "Jenny",
    text: "Jenny",
    value: "Jenny",
    image: {
      avatar: true,
      src: "https://react.semantic-ui.com/images/avatar/small/jenny.jpg",
    },
  },
  {
    key: "Elliot",
    text: "Elliot",
    value: "Elliot",
    image: {
      avatar: true,
      src: "https://react.semantic-ui.com/images/avatar/small/elliot.jpg",
    },
  },
  {
    key: "Stevie",
    text: "Stevie",
    value: "Stevie",
    image: {
      avatar: true,
      src: "https://react.semantic-ui.com/images/avatar/small/stevie.jpg",
    },
  },
  {
    key: "Christian",
    text: "Christian",
    value: "Christian",
    image: {
      avatar: true,
      src: "https://react.semantic-ui.com/images/avatar/small/christian.jpg",
    },
  },
  {
    key: "Matt",
    text: "Matt",
    value: "Matt",
    image: {
      avatar: true,
      src: "https://react.semantic-ui.com/images/avatar/small/matt.jpg",
    },
  },
  {
    key: "Justen",
    text: "Justen",
    value: "Justen",
    image: {
      avatar: true,
      src: "https://react.semantic-ui.com/images/avatar/small/justen.jpg",
    },
  },
];

// TODO: get topics from api
const topics = [
  { key: "Node.js", text: "Node.js", value: "Node.js", icon: "node js" },
  { key: "python", text: "Python", value: "Python", icon: "python" },
  { key: "react", text: "React", value: "React", icon: "react" },
];

// TODO: store filters as state
// TODO: delete filter when you click on label close icon
// TODO: add filter when you click on filter button dropdown menu item
// TODO: fetch new results when filters change
const filters = [
  { icon: "calendar", text: "9/21/20", type: "date" },
  {
    picture: "https://react.semantic-ui.com/images/avatar/small/jenny.jpg",
    text: "Jenny",
    type: "instructor",
  },
  { icon: "node js", text: "Node.js", type: "topic" },
  {
    picture: "https://react.semantic-ui.com/images/avatar/small/ade.jpg",
    text: "Adrienne",
    type: "instructor",
  },
];

// TODO: store datetimes for booking start and stop
const results = [
  {
    id: "12345",
    instructor: {
      name: "Jenny",
      picture: "https://react.semantic-ui.com/images/avatar/large/jenny.jpg",
    },
    booking: {
      start: "",
      stop: "",
    },
  },
];

const FilterDropdown = ({ icon, options, text }) => (
  <Dropdown
    text={text}
    icon={icon}
    floating
    fluid
    labeled
    button
    className="icon large"
    search
    options={options}
  ></Dropdown>
);

// TODO: extract arrow list to dedicated component and reuse in booking and checkout
const Booking = (props) => {
  const student = useContext(StudentContext);
  return (
    <div>
      <Header>Book a lesson for {student.givenName}</Header>
      <Segment padded>
        <Header>
          Pick your lesson parameters
          <Header.Subheader>
            Find the ideal timeslot and instructor for {student.givenName}.
          </Header.Subheader>
        </Header>
        <List>
          <List.Item>
            <List.Icon name="arrow right"></List.Icon>
            <List.Content>
              Each lesson costs <strong>$50</strong> and lasts for 1hr
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="arrow right"></List.Icon>
            <List.Content>
              Book as many lessons as you like each month
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="arrow right"></List.Icon>
            <List.Content>Cancel or reschedule lessons on the fly</List.Content>
          </List.Item>
        </List>
      </Segment>
      <Segment padded raised>
        <Header>Lessons</Header>
        <Grid>
          <Grid.Row columns="equal">
            <Grid.Column>
              <Input fluid type="date"></Input>
            </Grid.Column>
            <Grid.Column>
              <FilterDropdown
                icon="lightning"
                options={topics}
                text="Topics"
              ></FilterDropdown>
            </Grid.Column>
            <Grid.Column>
              <FilterDropdown
                icon="users"
                options={instructors}
                text="Instructors"
              ></FilterDropdown>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider horizontal>Filters</Divider>
        <Label.Group>
          {filters.map((filter) => (
            <Label image={filter.type === "instructor"} key={filter.text}>
              {filter.type === "instructor" ? (
                <img alt={filter.text} src={filter.picture}></img>
              ) : (
                <Icon name={filter.icon}></Icon>
              )}
              {filter.text}
              <Icon name="delete"></Icon>
            </Label>
          ))}
        </Label.Group>
        <Divider horizontal>Results</Divider>
        <Item.Group divided>
          {results.map((result) => {
            // TODO: uninstall moment
            // TODO: install date-fns or alternative

            // TODO: get day and start time from result.booking.start
            const dayTime = "Tuesday at 4pm";

            // TODO: get presentable date from result.booking.start
            const date = "September 29th, 2020";

            // TODO: get timeslot from result.booking.start and result.booking.stop
            const timeslot = "4pm - 5pm";

            return (
              <Item key={result.id}>
                <Item.Image
                  size="tiny"
                  src={result.instructor.picture}
                ></Item.Image>
                <Item.Content>
                  <Item.Header>{dayTime}</Item.Header>
                  <Item.Meta>
                    <List floated="left">
                      <List.Item icon="calendar" content={date}></List.Item>
                      <List.Item icon="clock" content={timeslot}></List.Item>
                    </List>
                    <Button
                      floated="right"
                      icon
                      labelPosition="right"
                      secondary
                    >
                      Book this lesson
                      <Icon name="right arrow"></Icon>
                    </Button>
                  </Item.Meta>
                </Item.Content>
              </Item>
            );
          })}
        </Item.Group>
      </Segment>
    </div>
  );
};

export default Booking;
