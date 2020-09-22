/* Amplify Params - DO NOT EDIT
	API_CLIENT_GRAPHQLAPIENDPOINTOUTPUT
	API_CLIENT_GRAPHQLAPIIDOUTPUT
	ENV
	FUNCTION_GETUSERNAMEFROMAUTHPROVIDER_NAME
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require("aws-sdk");
const https = require("https");
const stripe = require("stripe");
const urlParse = require("url").URL;

const RETURN_URL = "https://classy.name/account";
const STRIPE_API_KEY_SECRET_ID = "stripe-api-key";

const APPSYNC_URL = process.env.API_CLIENT_GRAPHQLAPIENDPOINTOUTPUT;
if (!APPSYNC_URL) {
  throw new Error(
    `Function requires environment variable: 'API_CLIENT_GRAPHQLAPIENDPOINTOUTPUT'`
  );
}

const GET_USERNAME_FUNCTION_NAME =
  process.env.FUNCTION_GETUSERNAMEFROMAUTHPROVIDER_NAME;
if (!GET_USERNAME_FUNCTION_NAME) {
  throw new Error(
    `Function requires environment variable: 'FUNCTION_GETUSERNAMEFROMAUTHPROVIDER_NAME'`
  );
}

const REGION = process.env.REGION;
if (!REGION) {
  throw new Error(`Function requires environment variable: 'REGION'`);
}

const endpoint = new urlParse(APPSYNC_URL).hostname.toString();
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

// TODO: extract graphqlOperation code to dedicated lambda
// TODO: invoke graphqlOperation lambda and use result
// TODO: remove graphqlOperation-related permissions from this lambda

async function executeGraphQLOperation(operation, operationName, item) {
  const request = new AWS.HttpRequest(APPSYNC_URL, REGION);

  request.method = "POST";
  request.path = "/graphql";
  request.headers.host = endpoint;
  request.headers["Content-Type"] = "application/json";
  request.body = JSON.stringify({
    query: operation,
    operationName: operationName,
    variables: item,
  });

  const signer = new AWS.Signers.V4(request, "appsync", true);
  signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());

  return new Promise((resolve, reject) => {
    const httpRequest = https.request(
      { ...request, host: endpoint },
      (result) => {
        result.on("data", (data) => {
          resolve(JSON.parse(data.toString()));
        });
      }
    );
    httpRequest.write(request.body);
    httpRequest.end();
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
