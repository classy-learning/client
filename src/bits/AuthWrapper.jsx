import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import React, { useEffect, useState } from "react";

import Authenticator from "bits/Authenticator";
import PropTypes from "prop-types";

const AuthWrapper = (props) => {
  // TODO: store authState context and user context
  const [authState, setAuthState] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  return authState === AuthState.SignedIn && user ? (
    props.children
  ) : (
    <Authenticator></Authenticator>
  );
};

AuthWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthWrapper;
