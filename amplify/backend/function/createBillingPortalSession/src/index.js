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

const AWS = require("aws-sdk");
const https = require("https");
const stripe = require("stripe");
const urlParse = require("url").URL;

const MUTATION = ``;
const QUERY = ``;
const RETURN_URL = "https://classy.name/account";
const STRIPE_API_KEY_SECRET_ID = "stripe-api-key";

const APPSYNC_URL = process.env.API_CLIENT_GRAPHQLAPIENDPOINTOUTPUT;
if (!APPSYNC_URL) {
  throw new Error(
    `Function requires environment variable: 'API_CLIENT_GRAPHQLAPIENDPOINTOUTPUT'`
  );
}

const COGNITO_USERPOOL_ID = process.env.AUTH_CLIENT01A53182_USERPOOLID;
if (!COGNITO_USERPOOL_ID) {
  throw new Error(
    `Function requires environment variable: 'AUTH_CLIENT01A53182_USERPOOLID'`
  );
}

const REGION = process.env.REGION;
if (!REGION) {
  throw new Error(`Function requires environment variable: 'REGION'`);
}

const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();
const endpoint = new urlParse(APPSYNC_URL).hostname.toString();
const secretsManager = new AWS.SecretsManager();

exports.handler = async (event) => {
  const Stripe = await configureStripe();
  const username = await getUsername(event);
  let stripeCustomer = await getStripeCustomer(username);
  if (!stripeCustomer) {
    stripeCustomer = await createStripeCustomer(username);
  }
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
    console.log(response);
    // TODO: extract and return data
  });
}

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
