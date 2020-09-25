/* Amplify Params - DO NOT EDIT
	AUTH_CLIENT01A53182_USERPOOLID
Amplify Params - DO NOT EDIT */

const { CognitoIdentityServiceProvider } = require("aws-sdk");

const COGNITO_USERPOOL_ID = process.env.AUTH_CLIENT01A53182_USERPOOLID;
if (!COGNITO_USERPOOL_ID) {
  throw new Error(
    `Function requires environment variable: 'COGNITO_USERPOOL_ID'`
  );
}

const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();

exports.handler = async (event) => {
  return getUser(event);
};

function getUser(username) {
  return cognitoIdentityServiceProvider
    .adminGetUser({
      UserPoolId: COGNITO_USERPOOL_ID,
      Username: username,
    })
    .promise();
}
