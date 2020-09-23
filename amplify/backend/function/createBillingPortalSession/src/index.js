/* Amplify Params - DO NOT EDIT
	ENV
	FUNCTION_GETUSERNAMEFROMAUTHPROVIDER_NAME
	FUNCTION_MUTATIONCREATESTRIPECUSTOMER_NAME
	FUNCTION_QUERYGETSTRIPECUSTOMERBYCUSTOMERUSERNAME_NAME
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require("aws-sdk");
const stripe = require("stripe");

const RETURN_URL = "https://classy.name/account";
const STRIPE_API_KEY_SECRET_ID = "stripe-api-key";

const GET_USERNAME_FUNCTION_NAME =
  process.env.FUNCTION_GETUSERNAMEFROMAUTHPROVIDER_NAME;
if (!GET_USERNAME_FUNCTION_NAME) {
  throw new Error(
    `Function requires environment variable: 'FUNCTION_GETUSERNAMEFROMAUTHPROVIDER_NAME'`
  );
}

const MUTATION_CREATE_STRIPE_CUSTOMER_FUNCTION_NAME =
  process.env.FUNCTION_MUTATIONCREATESTRIPECUSTOMER_NAME;
if (!MUTATION_CREATE_STRIPE_CUSTOMER_FUNCTION_NAME) {
  throw new Error(
    `Function requires environment variable: 'FUNCTION_MUTATIONCREATESTRIPECUSTOMER_NAME'`
  );
}

const QUERY_GET_STRIPE_CUSTOMER_FUNCTION_NAME =
  process.env.FUNCTION_QUERYGETSTRIPECUSTOMERBYCUSTOMERUSERNAME_NAME;
if (!QUERY_GET_STRIPE_CUSTOMER_FUNCTION_NAME) {
  throw new Error(
    `Function requires environment variable: 'FUNCTION_QUERYGETSTRIPECUSTOMERBYCUSTOMERUSERNAME_NAME'`
  );
}

const lambda = new AWS.Lambda();
const secretsManager = new AWS.SecretsManager();

exports.handler = async (event) => {
  const Stripe = await configureStripe();
  const username = await getUsername(event);
  let stripeCustomer = await getStripeCustomer(username);
  if (!stripeCustomer) {
    stripeCustomer = await createStripeCustomer(username);
  }
  const session = await Stripe.billingPortal.sessions.create({
    customer: stripeCustomer.stripeCustomerId,
    return_url: RETURN_URL,
  });
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(session.url),
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

function createStripeCustomer(username) {
  return lambda
    .invoke({
      FunctionName: MUTATION_CREATE_STRIPE_CUSTOMER_FUNCTION_NAME,
      Payload: JSON.stringify(username),
    })
    .promise()
    .then((response) => {
      return JSON.parse(response.Payload);
    });
}

function getStripeCustomer(username) {
  return lambda
    .invoke({
      FunctionName: QUERY_GET_STRIPE_CUSTOMER_FUNCTION_NAME,
      Payload: JSON.stringify(username),
    })
    .promise()
    .then((response) => {
      return JSON.parse(response.Payload);
    });
}

function getUsername(event) {
  return lambda
    .invoke({
      FunctionName: GET_USERNAME_FUNCTION_NAME,
      Payload: JSON.stringify(event),
    })
    .promise()
    .then((response) => {
      return JSON.parse(response.Payload);
    });
}
