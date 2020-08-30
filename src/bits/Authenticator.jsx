import { AmplifyAuthenticator, AmplifyContainer } from "@aws-amplify/ui-react";

import React from "react";

const Authenticator = (props) => {
  return (
    <AmplifyContainer>
      <AmplifyAuthenticator></AmplifyAuthenticator>
    </AmplifyContainer>
  );
};

export default Authenticator;
