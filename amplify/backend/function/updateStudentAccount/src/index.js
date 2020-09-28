/* Amplify Params - DO NOT EDIT
	API_CLIENT_GRAPHQLAPIIDOUTPUT
	API_CLIENT_STUDENTACCOUNTTABLE_ARN
	API_CLIENT_STUDENTACCOUNTTABLE_NAME
	ENV
	FUNCTION_GETSTUDENTACCOUNTBYIDQUERY_NAME
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require("aws-sdk");

const GET_STUDENT_ACCOUNT_FUNCTION_NAME =
  process.env.FUNCTION_GETSTUDENTACCOUNTBYIDQUERY_NAME;
if (!GET_STUDENT_ACCOUNT_FUNCTION_NAME) {
  throw new Error(
    `Function requires environment variable: 'FUNCTION_GETSTUDENTACCOUNTBYIDQUERY_NAME'`
  );
}

const STUDENT_ACCOUNT_TABLE_NAME =
  process.env.API_CLIENT_STUDENTACCOUNTTABLE_NAME;
if (!STUDENT_ACCOUNT_TABLE_NAME) {
  throw new Error(
    `Function requires environment variable: 'API_CLIENT_STUDENTACCOUNTTABLE_NAME'`
  );
}

const documentClient = new AWS.DynamoDB.DocumentClient();
const lambda = new AWS.Lambda();

exports.handler = async (event) => {
  const studentAccountId = event.arguments.input.id;
  const stripeSubscriptionId = event.arguments.input.stripeSubscriptionId;
  const dateTime = event.dateTime;
  await updateStudentAccountRecord(
    studentAccountId,
    stripeSubscriptionId,
    dateTime
  );
  return getStudentAccount(studentAccountId);
};

function getStudentAccount(studentAccountId) {
  return lambda
    .invoke({
      FunctionName: GET_STUDENT_ACCOUNT_FUNCTION_NAME,
      Payload: JSON.stringify(studentAccountId),
    })
    .promise()
    .then((response) => {
      return JSON.parse(response.Payload);
    });
}

function updateStudentAccountRecord(
  studentAccountId,
  stripeSubscriptionId,
  dateTime
) {
  return documentClient
    .update({
      TableName: STUDENT_ACCOUNT_TABLE_NAME,
      Key: { id: studentAccountId },
      UpdateExpression: "set stripeSubscriptionId = :x, updatedAt = :y",
      ExpressionAttributeValues: { ":x": stripeSubscriptionId, ":y": dateTime },
    })
    .promise();
}
