/* Amplify Params - DO NOT EDIT
	ENV
	FUNCTION_CREATECUSTOMERACCOUNTMUTATION_NAME
	FUNCTION_GETCUSTOMERACCOUNTBYUSERNAMEQUERY_NAME
	FUNCTION_GETUSERNAMEFROMAUTHPROVIDER_NAME
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

const CREATE_CUSTOMER_ACCOUNT_MUTATION =
  process.env.FUNCTION_CREATECUSTOMERACCOUNTMUTATION_NAME;
if (!CREATE_CUSTOMER_ACCOUNT_MUTATION) {
  throw new Error(
    `Function requires environment variable: 'FUNCTION_CREATECUSTOMERACCOUNTMUTATION_NAME'`
  );
}

const GET_CUSTOMER_ACCOUNT_QUERY =
  process.env.FUNCTION_GETCUSTOMERACCOUNTBYUSERNAMEQUERY_NAME;
if (!GET_CUSTOMER_ACCOUNT_QUERY) {
  throw new Error(
    `Function requires environment variable: 'FUNCTION_GETCUSTOMERACCOUNTBYUSERNAMEQUERY_NAME'`
  );
}

const lambda = new AWS.Lambda();
const secretsManager = new AWS.SecretsManager();

exports.handler = async (event) => {
  const Stripe = await configureStripe();
  const username = await getUsername(event);
  let customerAccount = await getCustomerAccount(username);
  if (!customerAccount) {
    customerAccount = await createCustomerAccount(username);
  }
  const session = await Stripe.billingPortal.sessions.create({
    customer: customerAccount.stripeCustomerId,
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

function createCustomerAccount(username) {
  return lambda
    .invoke({
      FunctionName: CREATE_CUSTOMER_ACCOUNT_MUTATION,
      Payload: JSON.stringify(username),
    })
    .promise()
    .then((response) => {
      return JSON.parse(response.Payload);
    });
}

function getCustomerAccount(username) {
  return lambda
    .invoke({
      FunctionName: GET_CUSTOMER_ACCOUNT_QUERY,
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
