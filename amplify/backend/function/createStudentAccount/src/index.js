/* Amplify Params - DO NOT EDIT
	AUTH_CLIENT936872C9_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { CognitoIdentityServiceProvider } = require("aws-sdk");

const COGNITO_USERPOOL_ID = process.env.AUTH_CLIENT936872C9_USERPOOLID;
if (!COGNITO_USERPOOL_ID) {
  throw new Error(
    `Function requires environment variable: 'COGNITO_USERPOOL_ID'`
  );
}

const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();

async function generateUsername({ givenName, familyName }) {
  const prefix = (givenName + familyName).toLowerCase();
  let suffix = 0;
  const username = () => prefix + suffix;
  const claimedUsernames = await cognitoIdentityServiceProvider
    .listUsers({
      UserPoolId: COGNITO_USERPOOL_ID,
      AttributesToGet: ["username"],
      Filter: `username ^= "${prefix}"`,
    })
    .promise().Users;
  while (claimedUsernames && claimedUsernames.includes(username())) {
    suffix++;
  }
  return username();
}

async function createStudentUser({
  username,
  birthdate,
  email,
  familyName,
  givenName,
}) {
  const user = await cognitoIdentityServiceProvider
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
  console.log(user);
  const response = await cognitoIdentityServiceProvider
    .adminAddUserToGroup({
      GroupName: "Students", // TODO: extract group names to constants or something
      UserPoolId: COGNITO_USERPOOL_ID,
      Username: username,
    })
    .promise();
  console.log(response);
}

exports.handler = async (event) => {
  const props = event.arguments.input;
  const username = await generateUsername(props);
  const user = await createStudentUser({ username, ...props });
  // TODO: create new cognito user in students group using username, email, phone
  // TODO: compose and add new StudentAccount item to StudentAccount table
  // TODO: return new StudentAccount item
};
