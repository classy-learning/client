/* Amplify Params - DO NOT EDIT
	ENV
	FUNCTION_EXECUTEGRAPHQLOPERATION_NAME
	REGION
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
  return createTeacherAccount(event);
};

function createTeacherAccount(username) {
  return executeGraphQLOperation(
    `mutation CreateTeacherAccount(
      $input: CreateTeacherAccountInput!
      $condition: ModelTeacherAccountConditionInput
    ) {
      createTeacherAccount(input: $input, condition: $condition) {
        teacherUsername
      }
    }`,
    "CreateTeacherAccount",
    { input: { teacherUsername: username } }
  ).then((response) => {
    return response.data.createTeacherAccount;
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
