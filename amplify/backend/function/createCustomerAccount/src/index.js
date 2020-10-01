/* Amplify Params - DO NOT EDIT
	API_CLIENT_CUSTOMERACCOUNTTABLE_ARN
	API_CLIENT_CUSTOMERACCOUNTTABLE_NAME
	API_CLIENT_GRAPHQLAPIIDOUTPUT
Amplify Params - DO NOT EDIT */

const stripe = require("stripe");
const AWS = require("aws-sdk");

const STRIPE_API_KEY_SECRET_ID = "stripe-api-key";

const CUSTOMER_ACCOUNT_TABLE_NAME =
  process.env.API_CLIENT_CUSTOMERACCOUNTTABLE_NAME;
if (!CUSTOMER_ACCOUNT_TABLE_NAME) {
  throw new Error(
    `Function requires environment variable: 'API_CLIENT_CUSTOMERACCOUNTTABLE_NAME'`
  );
}

const documentClient = new AWS.DynamoDB.DocumentClient();
const secretsManager = new AWS.SecretsManager();

exports.handler = async (event) => {
  const Stripe = await configureStripe();

  const username = event.arguments.input.customerUsername;
  const customer = await Stripe.customers.create();

  const customerAccount = {
    id: event.stripeCustomerId,
    customerUsername: username,
    stripeCustomerId: customer.id,
  };

  await createCustomerAccount(customerAccount);

  return customerAccount;
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

function createCustomerAccount(customerAccount) {
  return documentClient
    .put({
      TableName: CUSTOMER_ACCOUNT_TABLE_NAME,
      Item: customerAccount,
    })
    .promise();
}
