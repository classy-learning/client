/* Amplify Params - DO NOT EDIT
	AUTH_CLIENT936872C9_USERPOOLID
Amplify Params - DO NOT EDIT */

const { CognitoIdentityServiceProvider } = require("aws-sdk");
const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();

const COGNITO_USERPOOL_ID = process.env.AUTH_CLIENT936872C9_USERPOOLID;
if (!COGNITO_USERPOOL_ID) {
  throw new Error(
    `Function requires environment variable: 'COGNITO_USERPOOL_ID'`
  );
}

async function getUser(username) {
  try {
    const result = await cognitoIdentityServiceProvider
      .adminGetUser({ UserPoolId: COGNITO_USERPOOL_ID, Username: username })
      .promise();
    console.log(result);
    return result;
  } catch (e) {
    throw new Error(`NOT FOUND`);
  }
}

const resolvers = {
  StudentAccount: {
    customerUser: (event) => getUser(event.source.customerId),
    studentUser: (event) => getUser(event.source.studentId),
  },
};

exports.handler = async (event) => {
  const typeHandler = resolvers[event.typeName];
  if (typeHandler) {
    const resolver = typeHandler[event.fieldName];
    if (resolver) {
      return await resolver(event);
    }
  }
  throw new Error("Resolver not found.");
};
