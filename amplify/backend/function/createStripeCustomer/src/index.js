/* Amplify Params - DO NOT EDIT
	API_CLIENT_GRAPHQLAPIIDOUTPUT
	API_CLIENT_STRIPECUSTOMERTABLE_ARN
	API_CLIENT_STRIPECUSTOMERTABLE_NAME
Amplify Params - DO NOT EDIT */

const stripe = require("stripe");
const AWS = require("aws-sdk");

const STRIPE_API_KEY_SECRET_ID = "stripe-api-key";

const STRIPE_CUSTOMER_TABLE_NAME =
  process.env.API_CLIENT_STRIPECUSTOMERTABLE_NAME;
if (!STRIPE_CUSTOMER_TABLE_NAME) {
  throw new Error(
    `Function requires environment variable: 'API_CLIENT_STRIPECUSTOMERTABLE_NAME'`
  );
}

const documentClient = new AWS.DynamoDB.DocumentClient();
const secretsManager = new AWS.SecretsManager();

exports.handler = async (event) => {
  const Stripe = await configureStripe();

  const username = event.arguments.input.customerUsername;
  const customer = await Stripe.customers.create();

  const stripeCustomer = {
    id: event.stripeCustomerId,
    customerUsername: username,
    stripeCustomerId: customer.id,
  };

  // TODO: create dynamodb record with stripe customerId and customerUsername
  await createStripeCustomer(stripeCustomer);

  return stripeCustomer;
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

function createStripeCustomer(customer) {
  return documentClient
    .put({
      TableName: STRIPE_CUSTOMER_TABLE_NAME,
      Item: customer,
    })
    .promise();
}
