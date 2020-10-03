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
  return getTeacherUsernameByTeacherAccountId(event);
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

function getTeacherUsernameByTeacherAccountId(teacherAccountId) {
  return executeGraphQLOperation(
    `query GetTeacherAccount($id: ID!) {
      getTeacherAccount(id: $id) {
        teacherUsername
      }
    }`,
    "GetTeacherAccount",
    { id: teacherAccountId }
  ).then((response) => {
    return response.data.getTeacherAccount;
  });
}
