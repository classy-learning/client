/* Amplify Params - DO NOT EDIT
	API_CLIENT_GRAPHQLAPIIDOUTPUT
	API_CLIENT_TEACHERACCOUNTTABLE_ARN
	API_CLIENT_TEACHERACCOUNTTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require("aws-sdk");

const TEACHER_ACCOUNT_TABLE_NAME =
  process.env.API_CLIENT_CUSTOMERACCOUNTTABLE_NAME;
if (!TEACHER_ACCOUNT_TABLE_NAME) {
  throw new Error(
    `Function requires environment variable: 'API_CLIENT_CUSTOMERACCOUNTTABLE_NAME'`
  );
}

const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  // TODO: create timekit layer? attach that layer to this lambda?
  // TODO: create timekit bookable resource
  // TODO: link bookable resource object to teacher account object
  const teacherAccount = {
    id: event.stripeCustomerId,
    teacherUsername: event.arguments.input.teacherUsername,
  };

  await createTeacherAccount(teacherAccount);

  return teacherAccount;
};

function createTeacherAccount(teacherAccount) {
  return documentClient
    .put({
      TableName: TEACHER_ACCOUNT_TABLE_NAME,
      Item: teacherAccount,
    })
    .promise();
}
