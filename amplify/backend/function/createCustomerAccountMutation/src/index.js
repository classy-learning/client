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
  return createCustomerAccount(event);
};

function createCustomerAccount(username) {
  return executeGraphQLOperation(
    `mutation CreateCustomerAccount(
      $input: CreateCustomerAccountInput!
      $condition: ModelCustomerAccountConditionInput
    ) {
      createCustomerAccount(input: $input, condition: $condition) {
        customerUsername
        stripeCustomerId
      }
    }`,
    "CreateCustomerAccount",
    { input: { customerUsername: username } }
  ).then((response) => {
    return response.data.createCustomerAccount;
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
