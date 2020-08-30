import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import React, { useEffect, useState } from "react";

import Authenticator from "bits/Authenticator";
import PropTypes from "prop-types";
import { UserProvider } from "bits/UserContext";

const AuthWrapper = (props) => {
  const [authState, setAuthState] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  return authState === AuthState.SignedIn && user ? (
    <UserProvider value={user}>{props.children}</UserProvider>
  ) : (
    <Authenticator></Authenticator>
  );
};

AuthWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthWrapper;
