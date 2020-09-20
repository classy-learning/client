/* Amplify Params - DO NOT EDIT
	AUTH_CLIENT01A53182_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

// TODO: import stripe; configure with key
// TODO: get sub for cognito user
// TODO: get stripe customer id from using sub

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
