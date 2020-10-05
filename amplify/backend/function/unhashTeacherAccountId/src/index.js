/* Amplify Params - DO NOT EDIT
	ENV
	FUNCTION_UNHASHVALUE_NAME
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require("aws-sdk");

const SECRET_KEY = "teacher-account-id-hash-secret";

const UNHASH_VALUE_FUNCTION_NAME = process.env.FUNCTION_UNHASHVALUE_NAME;
if (!UNHASH_VALUE_FUNCTION_NAME) {
  throw new Error(
    `Function requires environment variable: 'FUNCTION_UNHASHVALUE_NAME'`
  );
}

const lambda = new AWS.Lambda();

exports.handler = async (event) => {
  return unhashTeacherAccountId(event, SECRET_KEY);
};

function unhashTeacherAccountId(teacherAccountId, secretKey) {
  return lambda
    .invoke({
      FunctionName: UNHASH_VALUE_FUNCTION_NAME,
      Payload: JSON.stringify({ key: secretKey, value: teacherAccountId }),
    })
    .promise()
    .then((response) => {
      return JSON.parse(response.Payload);
    });
}
