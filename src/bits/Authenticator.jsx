import { AmplifyAuthenticator, AmplifyContainer } from "@aws-amplify/ui-react";

import React from "react";

const Authenticator = (props) => {
  // TODO: custom authenticators for teachers, students, and customers.
  return (
    <AmplifyContainer>
      <AmplifyAuthenticator></AmplifyAuthenticator>
    </AmplifyContainer>
  );
};

export default Authenticator;
