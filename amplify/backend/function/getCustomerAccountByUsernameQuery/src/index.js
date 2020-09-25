/* Amplify Params - DO NOT EDIT
	FUNCTION_EXECUTEGRAPHQLOPERATION_NAME
Amplify Params - DO NOT EDIT */

const AWS = require("aws-sdk");

const EXECUTE_GQL_OPERATION_FUNCTION_NAME =
  process.env.FUNCTION_EXECUTEGRAPHQLOPERATION_NAME;
if (!EXECUTE_GQL_OPERATION_FUNCTION_NAME) {
  throw new Error(
    `Function requires environment variable: 'FUNCTION_EXECUTEGRAPHQLOPERATION_NAME'`
  );
}

const lambda = new AWS.Lambda();

exports.handler = async (event) => {
  return getCustomerAccount(event);
};

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

function getCustomerAccount(username) {
  return executeGraphQLOperation(
    `query CustomerAccountsByCustomerUsername($customerUsername: ID) {
      customerAccountsByCustomerUsername(customerUsername: $customerUsername) {
        items {
          customerUsername
          stripeCustomerId
        }
      }
    }`,
    "CustomerAccountsByCustomerUsername",
    { customerUsername: username }
  ).then((response) => {
    return response.data.customerAccountsByCustomerUsername.items[0];
  });
}
