/* Amplify Params - DO NOT EDIT
	AUTH_CLIENT01A53182_USERPOOLID
Amplify Params - DO NOT EDIT */

const AWS = require("aws-sdk");

const COGNITO_USERPOOL_ID = process.env.AUTH_CLIENT01A53182_USERPOOLID;
if (!COGNITO_USERPOOL_ID) {
  throw new Error(
    `Function requires environment variable: 'AUTH_CLIENT01A53182_USERPOOLID'`
  );
}

const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

exports.handler = async (event) => {
  return await getUsername(event);
};

function getSub(event) {
  const provider = event.requestContext.identity.cognitoAuthenticationProvider;
  return provider.substring(provider.lastIndexOf(":") + 1);
}

function getUsername(event) {
  const sub = getSub(event);
  return cognitoIdentityServiceProvider
    .listUsers({
      UserPoolId: COGNITO_USERPOOL_ID,
      Filter: `sub = \"${sub}\"`,
    })
    .promise()
    .then((data) => {
      return data.Users[0].Username;
    });
}
