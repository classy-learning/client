import {
  Checkbox,
  Form,
  Grid,
  Header,
  Segment,
  TextArea,
} from "semantic-ui-react";
import React, { useState } from "react";

// TODO: enroll student
// TODO: focus on first blank required field when user views form
// TODO: set form state (loading, error, warning, success)
// TODO: useState for each field value
const Enroll = (props) => {
  const [loading, setLoading] = useState(false);
  return (
    <Grid container padded>
      <Grid.Column align="center">
        <Segment align="left" compact raised padded="very">
          <Header>Enroll a new student</Header>
          <Form
            loading={loading}
            onSubmit={() => {
              setLoading(true);
              // TODO: validate form
              // TODO: use form data to create student in graphql api
              // TODO: redirect to new student page on success
              console.log("submit");
            }}
          >
            <Form.Field id="form-input-control-first-name" required>
              <label>First name</label>
              <input placeholder="First name"></input>
            </Form.Field>
            <Form.Field id="form-input-control-last-name" required>
              <label>Last name</label>
              <input placeholder="Last name"></input>
            </Form.Field>
            <Form.Field id="form-input-control-birthday" required>
              <label>Birthday</label>
              <input type="date"></input>
            </Form.Field>
            <Form.Field
              control={TextArea}
              id="form-textarea-control-about"
              label="About"
              placeholder="Anything you want us to know?"
            />
            <Form.Field
              control={Checkbox}
              id="form-checkbox-control-agreement"
              label="I agree to the Terms and Conditions"
              required
            />
            <Form.Button content="Submit" fluid primary />
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default Enroll;
