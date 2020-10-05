/* Amplify Params - DO NOT EDIT
	ENV
	FUNCTION_HASHVALUE_NAME
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require("aws-sdk");

const SECRET_KEY = "teacher-account-id-hash-secret";

const HASH_VALUE_FUNCTION_NAME = process.env.FUNCTION_HASHVALUE_NAME;
if (!HASH_VALUE_FUNCTION_NAME) {
  throw new Error(
    `Function requires environment variable: 'FUNCTION_HASHVALUE_NAME'`
  );
}

const lambda = new AWS.Lambda();

exports.handler = async (event) => {
  return hashTeacherAccountId(event, SECRET_KEY);
};

function hashTeacherAccountId(teacherAccountId, secretKey) {
  return lambda
    .invoke({
      FunctionName: HASH_VALUE_FUNCTION_NAME,
      Payload: JSON.stringify({ key: secretKey, value: teacherAccountId }),
    })
    .promise()
    .then((response) => {
      return JSON.parse(response.Payload);
    });
}
