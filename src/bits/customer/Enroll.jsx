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

import { API } from "aws-amplify";
import { createStudentAccount } from "graphql/mutations";
import moment from "moment";
import { useHistory } from "react-router-dom";
import validator from "email-validator";

// TODO: focus on first blank required field when user views form
const Enroll = (props) => {
  const history = useHistory();

  const [input, setInput] = useState({
    givenName: "",
    familyName: "",
    birthdate: "",
    agree: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({ content: "", header: "" });

  const handleCheckboxChange = (e, { name, checked }) => {
    setInput({ ...input, [name]: checked });
    console.log(input);
  };

  const handleInputChange = (e) => {
    setInput({ ...input, [e.currentTarget.name]: e.currentTarget.value });
    console.log(input);
  };

  const setFormState = (state) => {
    setError(state === "error");
    setLoading(state === "loading");
  };

  // TODO: return id of created account
  async function submitFormData() {
    try {
      const result = await API.graphql({
        query: createStudentAccount,
        variables: {
          input: {
            givenName: input.givenName,
            familyName: input.familyName,
            birthdate: input.birthdate,
            email: input.email,
          },
        },
      });
      console.log(result);
    } catch (e) {
      console.log(e);
    }

    // TODO: use form data to create student in graphql api
    // TODO: THEN: return newly created student id from this function
    // TODO: CATCH: return error object: {content: "string", header: "string"} on error
    return "testStudent";
  }

  const validateFormData = () =>
    input.givenName.trim() &&
    input.familyName.trim() &&
    moment(input.birthdate, "YYYY-MM-DD", true).isValid() &&
    validator.validate(input.email) &&
    input.agree;

  return (
    <Grid container padded>
      <Grid.Column align="center">
        <Segment align="left" compact raised padded="very">
          <Header>Enroll a new student</Header>
          <Form
            error={error}
            loading={loading}
            onSubmit={(e) => {
              e.preventDefault();
              if (validateFormData()) {
                setFormState("loading");
                submitFormData()
                  .then((studentId) => {
                    // TODO: update student context to reflect new student
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
                name={"givenName"}
                onChange={handleInputChange}
                placeholder="First name"
              ></Form.Input>
            </Form.Field>
            <Form.Field id="form-input-control-last-name" required>
              <label>Last name</label>
              <Form.Input
                name={"familyName"}
                onChange={handleInputChange}
                placeholder="Last name"
              ></Form.Input>
            </Form.Field>
            <Form.Field id="form-input-control-birthdate" required>
              <label>Birthday</label>
              <Form.Input
                name={"birthdate"}
                onChange={handleInputChange}
                type="date"
              ></Form.Input>
            </Form.Field>
            <Form.Field id="form-input-control-email" required>
              <label>Email</label>
              <Form.Input
                name={"email"}
                onChange={handleInputChange}
                type="email"
              ></Form.Input>
            </Form.Field>
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
