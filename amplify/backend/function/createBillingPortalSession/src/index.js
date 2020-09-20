/* Amplify Params - DO NOT EDIT
	API_CLIENT_GRAPHQLAPIENDPOINTOUTPUT
	API_CLIENT_GRAPHQLAPIIDOUTPUT
	AUTH_CLIENT01A53182_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

// TODO: get sub for cognito user from event
// TODO: get username from cognito using sub
// TODO: get stripe customer id from gqlapi using username
// TODO: if no stripe customer exists, create one using gql api mutation
// TODO: use stripe customer id to return new billing portal session

// TODO: create createStripeCustomer mutation that invokes a lambda function to create a customer

const STRIPE_API_KEY_SECRET_ID = "stripe-api-key";
const RETURN_URL = "https://classy.name/account";

const stripe = require("stripe");
const AWS = require("aws-sdk");

const secretsManager = new AWS.SecretsManager();

exports.handler = async (event) => {
  const secret = await secretsManager
    .getSecretValue({ SecretId: STRIPE_API_KEY_SECRET_ID })
    .promise();
  const stripeApiKey = JSON.parse(secret.SecretString)[
    STRIPE_API_KEY_SECRET_ID
  ];
  const Stripe = stripe(stripeApiKey);

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify("Hello from Lambda!"),
  };
};
