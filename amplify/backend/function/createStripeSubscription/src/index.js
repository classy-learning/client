/* Amplify Params - DO NOT EDIT
	ENV
	FUNCTION_CREATECUSTOMERACCOUNTMUTATION_NAME
	FUNCTION_GETCUSTOMERACCOUNTBYUSERNAMEQUERY_NAME
	FUNCTION_GETUSERNAMEFROMAUTHPROVIDER_NAME
	FUNCTION_UPDATESTUDENTACCOUNTMUTATION_NAME
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require("aws-sdk");
const stripe = require("stripe");

const DESKTOP_ACCESS_ID = "price_1HSu2nIw1gARdZqqFDGSDh7a";
const FLAT_RATE_PRICE_ID = "price_1HSu3vIw1gARdZqqoLrJrdCe";
const LESSON_PRICE_ID = "price_1HStnKIw1gARdZqqT2UwSZcH";
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

const UPDATE_STUDENT_ACCOUNT_FUNCTION_NAME =
  process.env.FUNCTION_UPDATESTUDENTACCOUNTMUTATION_NAME;
if (!UPDATE_STUDENT_ACCOUNT_FUNCTION_NAME) {
  throw new Error(
    `Function requires environment variable: 'FUNCTION_UPDATESTUDENTACCOUNTMUTATION_NAME'`
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
  const customerId = customerAccount.stripeCustomerId;

  const paymentMethodId = event.queryStringParameters.paymentMethodId;
  await Stripe.paymentMethods.attach(paymentMethodId, {
    customer: customerId,
  });

  await Stripe.customers.update(customerId, {
    invoice_settings: {
      default_payment_method: paymentMethodId,
    },
  });

  const subscription = await Stripe.subscriptions.create({
    customer: customerId,
    items: [
      { price: FLAT_RATE_PRICE_ID },
      { price: LESSON_PRICE_ID },
      { price: DESKTOP_ACCESS_ID },
    ],
  });

  const studentAccount = await updateStudentAccount(
    event.queryStringParameters.studentAccountId,
    subscription.id
  );

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(studentAccount),
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

function updateStudentAccount(studentAccountId, stripeSubscriptionId) {
  return lambda
    .invoke({
      FunctionName: UPDATE_STUDENT_ACCOUNT_FUNCTION_NAME,
      Payload: JSON.stringify({
        studentAccountId: studentAccountId,
        stripeSubscriptionId: stripeSubscriptionId,
      }),
    })
    .promise()
    .then((response) => {
      return JSON.parse(response.Payload);
    });
}
