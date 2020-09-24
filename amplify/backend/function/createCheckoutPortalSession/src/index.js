/* Amplify Params - DO NOT EDIT
	ENV
	FUNCTION_GETUSERNAMEFROMAUTHPROVIDER_NAME
	FUNCTION_MUTATIONCREATESTRIPECUSTOMER_NAME
	FUNCTION_QUERYGETSTRIPECUSTOMERBYCUSTOMERUSERNAME_NAME
	REGION
Amplify Params - DO NOT EDIT */

// TODO: remove this lambda
// TODO: use stripe elements to handle subscriptions

const AWS = require("aws-sdk");
const stripe = require("stripe");

const STRIPE_API_KEY_SECRET_ID = "stripe-api-key";
const SUBSCRIPTION_PRICE_ID = "price_1HSu3vIw1gARdZqqoLrJrdCe";
const DESKTOP_PRICE_ID = "price_1HSu2nIw1gARdZqqFDGSDh7a";
const LESSON_PRICE_ID = "price_1HStnKIw1gARdZqqT2UwSZcH";

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

  const studentUsername = event.queryStringParameters.studentUsername;
  const redirectUrl = `https://classy.name/student/${studentUsername}`;

  const session = await Stripe.checkout.sessions.create({
    customer: stripeCustomer.stripeCustomerId,
    payment_method_types: ["card"],
    line_items: [
      {
        price: SUBSCRIPTION_PRICE_ID,
        quantity: 1,
      },
      {
        price: LESSON_PRICE_ID,
        quantity: 1,
      },
      {
        price: DESKTOP_PRICE_ID,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: redirectUrl,
    cancel_url: redirectUrl,
  });

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
