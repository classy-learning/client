/* Amplify Params - DO NOT EDIT
	ENV
	FUNCTION_GETCOGNITOUSERBYUSERNAME_NAME
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require("aws-sdk");

const GET_COGNITO_USER_FUNCTION_NAME =
  process.env.FUNCTION_GETCOGNITOUSERBYUSERNAME_NAME;
if (!GET_COGNITO_USER_FUNCTION_NAME) {
  throw new Error(
    `Function requires environment variable: 'FUNCTION_GETCOGNITOUSERBYUSERNAME_NAME'`
  );
}

const FIELD_RESOLVERS = {
  StudentAccount: {
    customerUser: (event) => getUser(event.source.customerUsername),
    studentUser: (event) => getUser(event.source.studentUsername),
  },
};

const lambda = new AWS.Lambda();

exports.handler = async (event) => {
  const typeHandler = FIELD_RESOLVERS[event.typeName];
  if (typeHandler) {
    const resolver = typeHandler[event.fieldName];
    if (resolver) {
      return resolver(event);
    }
  }
  throw new Error("Resolver not found.");
};

function getUser(username) {
  return lambda
    .invoke({
      FunctionName: GET_COGNITO_USER_FUNCTION_NAME,
      Payload: JSON.stringify(username),
    })
    .promise()
    .then((response) => {
      return JSON.parse(response.Payload);
    });
}
