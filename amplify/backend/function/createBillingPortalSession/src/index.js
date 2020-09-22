/* Amplify Params - DO NOT EDIT
	ENV
	FUNCTION_EXECUTEGRAPHQLOPERATION_NAME
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

const EXECUTE_GQL_OPERATION_FUNCTION_NAME =
  process.env.FUNCTION_EXECUTEGRAPHQLOPERATION_NAME;
if (!EXECUTE_GQL_OPERATION_FUNCTION_NAME) {
  throw new Error(
    `Function requires environment variable: 'FUNCTION_EXECUTEGRAPHQLOPERATION_NAME'`
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

// TODO: extract stripe configuration to dedicated lambda
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
  return executeGraphQLOperation(
    `mutation CreateStripeCustomer(
      $input: CreateStripeCustomerInput!
      $condition: ModelStripeCustomerConditionInput
    ) {
      createStripeCustomer(input: $input, condition: $condition) {
        customerUsername
        stripeCustomerId
      }
    }`,
    "CreateStripeCustomer",
    { input: { customerUsername: username } }
  ).then((response) => {
    return response.data.createStripeCustomer;
  });
}

function executeGraphQLOperation(operation, operationName, item) {
  return lambda
    .invoke({
      FunctionName: EXECUTE_GQL_OPERATION_FUNCTION_NAME,
      Payload: JSON.stringify({
        operation: operation,
        operationName: operationName,
        item: item,
      }),
    })
    .promise()
    .then((response) => {
      return JSON.parse(response.Payload);
    });
}

function getStripeCustomer(username) {
  return executeGraphQLOperation(
    `query StripeCustomersByCustomerUsername($customerUsername: ID) {
      stripeCustomersByCustomerUsername(customerUsername: $customerUsername) {
        items {
          customerUsername
          stripeCustomerId
        }
      }
    }`,
    "StripeCustomersByCustomerUsername",
    { customerUsername: username }
  ).then((response) => {
    return response.data.stripeCustomersByCustomerUsername.items[0];
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
