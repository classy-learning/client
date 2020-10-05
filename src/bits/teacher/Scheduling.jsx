import { Button, Form, Header, List, Segment } from "semantic-ui-react";

import React from "react";

const Scheduling = (props) => {
  return (
    <div>
      <Header>Set your availability</Header>
      <Segment padded>
        <Header>
          Configure your Timekit account.
          <Header.Subheader>
            We use <a href="https://www.timekit.io/">Timekit</a> to automate
            scheduling.
          </Header.Subheader>
        </Header>
        <List>
          <List.Item>
            <List.Icon name="arrow right"></List.Icon>
            <List.Content>Update your availability on the fly</List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="arrow right"></List.Icon>
            <List.Content>
              Get automatic calendar updates and notifications
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="arrow right"></List.Icon>
            <List.Content>
              Cancel and reschedule your lessons as needed
            </List.Content>
          </List.Item>
        </List>
      </Segment>
      <Segment padded raised>
        <Header>Link your calendar provider</Header>
        <Button.Group secondary size="large" widths={2}>
          <Button
            content="Google Calendar"
            icon="google"
            labelPosition="left"
          ></Button>
          <Button.Or />
          <Button
            content="Microsoft Outlook"
            icon="microsoft"
            labelPosition="right"
          ></Button>
        </Button.Group>
      </Segment>
    </div>
  );
};

export default Scheduling;
