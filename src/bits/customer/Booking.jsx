import {
  Button,
  Divider,
  Form,
  Header,
  Icon,
  Item,
  Label,
  List,
  Segment,
} from "semantic-ui-react";
import React, { useContext } from "react";

import StudentContext from "bits/customer/StudentContext";

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

const topics = [
  { key: "Node.js", text: "Node.js", value: "Node.js", icon: "node js" },
  { key: "python", text: "Python", value: "Python", icon: "python" },
  { key: "react", text: "React", value: "React", icon: "react" },
];

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
        <Form>
          <Form.Group widths="equal">
            <Form.Input fluid label="Date" type="date"></Form.Input>
            <Form.Dropdown
              fluid
              label="Topics"
              options={topics}
              placeholder="Select topics"
              search
              selection
            ></Form.Dropdown>
            <Form.Dropdown
              fluid
              label="Instructor"
              options={instructors}
              placeholder="Select instructors"
              selection
            ></Form.Dropdown>
          </Form.Group>
        </Form>
        <Divider horizontal>Filters</Divider>
        <Label.Group>
          <Label>
            <Icon name="calendar"></Icon>
            9/21/20
            <Icon name="delete"></Icon>
          </Label>
          <Label image>
            <img src="https://react.semantic-ui.com/images/avatar/small/jenny.jpg" />
            Jenny
            <Icon name="delete"></Icon>
          </Label>
          <Label image>
            <img src="https://react.semantic-ui.com/images/avatar/small/ade.jpg" />
            Adrienne
            <Icon name="delete"></Icon>
          </Label>
          <Label>
            <Icon name="node js"></Icon>
            Node.js
            <Icon name="delete"></Icon>
          </Label>
        </Label.Group>
        <Divider horizontal>Results</Divider>
        <Item.Group divided>
          <Item>
            <Item.Image
              size="tiny"
              src="https://react.semantic-ui.com/images/avatar/large/jenny.jpg"
            ></Item.Image>
            <Item.Content>
              <Item.Header>Tuesday at 4pm</Item.Header>
              <Item.Meta>
                <List floated="left">
                  <List.Item
                    icon="calendar"
                    content="September 29th, 2020"
                  ></List.Item>
                  <List.Item icon="clock" content="4pm - 5pm"></List.Item>
                </List>
                <Button floated="right" icon labelPosition="right" secondary>
                  Book this lesson
                  <Icon name="right arrow"></Icon>
                </Button>
              </Item.Meta>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </div>
  );
};

export default Booking;
