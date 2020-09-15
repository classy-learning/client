/* Amplify Params - DO NOT EDIT
	API_CLIENT_GRAPHQLAPIIDOUTPUT
	API_CLIENT_STUDENTACCOUNTTABLE_ARN
	API_CLIENT_STUDENTACCOUNTTABLE_NAME
	AUTH_CLIENT936872C9_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require("aws-sdk");

const COGNITO_USERPOOL_ID = process.env.AUTH_CLIENT936872C9_USERPOOLID;
if (!COGNITO_USERPOOL_ID) {
  throw new Error(
    `Function requires environment variable: 'AUTH_CLIENT936872C9_USERPOOLID'`
  );
}

const STUDENT_ACCOUNT_TABLE_NAME =
  process.env.API_CLIENT_STUDENTACCOUNTTABLE_NAME;
if (!STUDENT_ACCOUNT_TABLE_NAME) {
  throw new Error(
    `Function requires environment variable: 'API_CLIENT_STUDENTACCOUNTTABLE_NAME'`
  );
}

const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const args = event.arguments.input;
  const username = await getUsername(args.givenName, args.familyName);
  const user = await createUser(
    username,
    args.birthdate,
    args.email,
    args.givenName,
    args.familyName
  );
  await groupUser(username, "Students");
  const account = {
    id: event.accountId,
    customerUsername: event.identity.username,
    studentUsername: username,
  };
  await createAccount(account);
  return account;
};

function createAccount(item) {
  return documentClient
    .put({
      TableName: STUDENT_ACCOUNT_TABLE_NAME,
      Item: item,
    })
    .promise();
}

function createUser(username, birthdate, email, givenName, familyName) {
  return cognitoIdentityServiceProvider
    .adminCreateUser({
      UserPoolId: COGNITO_USERPOOL_ID,
      Username: username,
      DesiredDeliveryMediums: ["EMAIL"],
      UserAttributes: [
        { Name: "birthdate", Value: birthdate },
        { Name: "email", Value: email },
        { Name: "family_name", Value: familyName },
        { Name: "given_name", Value: givenName },
      ],
    })
    .promise();
}

// TODO: fix "User account already exists" error
async function getUsername(givenName, familyName) {
  const prefix = (givenName + familyName).toLowerCase();
  let suffix = 0;
  const concatenate = () => prefix + suffix;
  const response = await cognitoIdentityServiceProvider
    .listUsers({
      UserPoolId: COGNITO_USERPOOL_ID,
      Filter: `username ^= \"${prefix}\"`,
    })
    .promise();
  const claimedUsernames = response.Users;
  while (claimedUsernames && claimedUsernames.includes(concatenate())) {
    suffix++;
  }
  return concatenate();
}

function groupUser(username, group) {
  return cognitoIdentityServiceProvider
    .adminAddUserToGroup({
      GroupName: group,
      UserPoolId: COGNITO_USERPOOL_ID,
      Username: username,
    })
    .promise();
}
