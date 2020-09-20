/* Amplify Params - DO NOT EDIT
	API_CLIENT_GRAPHQLAPIENDPOINTOUTPUT
	API_CLIENT_GRAPHQLAPIIDOUTPUT
	AUTH_CLIENT01A53182_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

// TODO: get stripe customer id from gqlapi using username
// TODO: if no stripe customer exists, create one using gql api mutation
// TODO: use stripe customer id to return new billing portal session

// TODO: create createStripeCustomer mutation that invokes a lambda function to create a customer

const stripe = require("stripe");
const AWS = require("aws-sdk");

const STRIPE_API_KEY_SECRET_ID = "stripe-api-key";
const RETURN_URL = "https://classy.name/account";

const COGNITO_USERPOOL_ID = process.env.AUTH_CLIENT01A53182_USERPOOLID;
if (!COGNITO_USERPOOL_ID) {
  throw new Error(
    `Function requires environment variable: 'AUTH_CLIENT01A53182_USERPOOLID'`
  );
}

const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();
const secretsManager = new AWS.SecretsManager();

exports.handler = async (event) => {
  const Stripe = await configureStripe();
  const username = await getUsername(event);
  console.log(username);
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify("Hello from Lambda!"),
  };
};

function configureStripe() {
  return secretsManager
    .getSecretValue({ SecretId: STRIPE_API_KEY_SECRET_ID })
    .promise()
    .then((secret) => {
      const stripeApiKey = JSON.parse(secret.SecretString)[
        STRIPE_API_KEY_SECRET_ID
      ];
      return stripe(stripeApiKey);
    });
}

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
