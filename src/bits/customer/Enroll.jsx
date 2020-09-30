import { API, graphqlOperation } from "aws-amplify";
import {
  Checkbox,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import React, { useContext, useState } from "react";

import StudentsContext from "bits/customer/StudentsContext";
import createStudentAccount from "bits/customer/createStudentAccount";
import moment from "moment";
import { useHistory } from "react-router-dom";
import validator from "email-validator";

// TODO: focus on first blank required field when user views form
const Enroll = (props) => {
  const students = useContext(StudentsContext);

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
  };

  const handleInputChange = (e) => {
    setInput({ ...input, [e.currentTarget.name]: e.currentTarget.value });
  };

  const setFormState = (state) => {
    setError(state === "error");
    setLoading(state === "loading");
  };

  function submitFormData() {
    return API.graphql(
      graphqlOperation(createStudentAccount, {
        input: {
          givenName: input.givenName,
          familyName: input.familyName,
          birthdate: input.birthdate,
          email: input.email,
        },
      })
    );
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
                  .then((response) => {
                    const username =
                      response.data.createStudentAccount.studentUsername;
                    history.push(`/student/${username}`);
                    // TODO: should i just use subscriptions instead of students.refresh()?
                    // students.refresh();
                  })
                  .catch((error) => {
                    // TODO: transform error into something you can use for seterrormessage
                    console.log(error);
                    setErrorMessage(error);
                    setFormState("error");
                  });
              } else {
                setErrorMessage({
                  header: "Oops...",
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
            <Form.Button
              content="Enroll student"
              fluid
              icon="add user"
              labelPosition="left"
              secondary
              size="large"
            />
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default Enroll;
