import { AmplifyAuthenticator, AmplifyContainer } from "@aws-amplify/ui-react";

import React from "react";

const Authenticator = (props) => {
  // TODO: customize authenticator for teachers, students, and customers.
  return (
    <AmplifyContainer>
      <AmplifyAuthenticator></AmplifyAuthenticator>
    </AmplifyContainer>
  );
};

export default Authenticator;
