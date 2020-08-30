import "./index.css";
import "semantic-ui-css/semantic.min.css";

import * as serviceWorker from "./serviceWorker";

import Amplify from "aws-amplify";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";
import awsExports from "./aws-exports";

Amplify.configure(awsExports);

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
