import {
  Checkbox,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  TextArea,
} from "semantic-ui-react";
import React, { useState } from "react";

import moment from "moment";
import { useHistory } from "react-router-dom";

// TODO: focus on first blank required field when user views form
const Enroll = (props) => {
  const history = useHistory();

  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    bio: "",
    agree: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({ content: "", header: "" });

  const handleInputChange = (e) => {
    setInput({ ...input, [e.currentTarget.name]: e.currentTarget.value });
    console.log(input);
  };

  const handleCheckboxChange = (e, { name, checked }) => {
    setInput({ ...input, [name]: checked });
    console.log(input);
  };

  const setFormState = (state) => {
    setError(state === "error");
    setLoading(state === "loading");
  };

  async function submitFormData() {
    // TODO: use form data to create student in graphql api
    // TODO: THEN: return newly created student id from this function
    // TODO: CATCH: return error object: {content: "string", header: "string"} on error
    return "testStudent";
  }

  const validateFormData = () =>
    input.firstName.trim() &&
    input.lastName.trim() &&
    moment(input.birthday, "YYYY-MM-DD", true).isValid() &&
    input.bio.length <= 1024 &&
    input.agree;

  return (
    <Grid container padded>
      <Grid.Column align="center">
        <Segment align="left" compact raised padded="very">
          <Header>Enroll a new student</Header>
          <Form
            error={error}
            loading={loading}
            onSubmit={() => {
              if (validateFormData()) {
                setFormState("loading");
                submitFormData()
                  .then((studentId) => {
                    history.push(`/student/${studentId}`);
                  })
                  .catch((error) => {
                    console.log(error);
                    setErrorMessage(error);
                    setFormState("error");
                  });
              } else {
                setErrorMessage({
                  header: "Invalid input",
                  content: "Required fields are marked with an asterisk.",
                });
                setFormState("error");
              }
            }}
          >
            <Form.Field id="form-input-control-first-name" required>
              <label>First name</label>
              <Form.Input
                name={"firstName"}
                onChange={handleInputChange}
                placeholder="First name"
              ></Form.Input>
            </Form.Field>
            <Form.Field id="form-input-control-last-name" required>
              <label>Last name</label>
              <Form.Input
                name={"lastName"}
                onChange={handleInputChange}
                placeholder="Last name"
              ></Form.Input>
            </Form.Field>
            <Form.Field id="form-input-control-birthday" required>
              <label>Birthday</label>
              <Form.Input
                name={"birthday"}
                onChange={handleInputChange}
                type="date"
              ></Form.Input>
            </Form.Field>
            <Form.Field
              control={TextArea}
              id="form-textarea-control-about"
              label="About"
              name={"bio"}
              onChange={handleInputChange}
              placeholder="Anything you want us to know?"
            />
            <Form.Field
              control={Checkbox}
              id="form-checkbox-control-agreement"
              label="I agree to the Terms and Conditions"
              name={"agree"}
              onChange={handleCheckboxChange}
              required
            />
            <Message
              error
              header={errorMessage.header}
              content={errorMessage.content}
            />
            <Form.Button content="Submit" fluid primary />
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default Enroll;
