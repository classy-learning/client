/* Amplify Params - DO NOT EDIT
	ENV
	FUNCTION_GETCOGNITOUSERBYUSERNAME_NAME
	FUNCTION_GETSTRIPESUBSCRIPTIONBYSUBSCRIPTIONID_NAME
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

const GET_STRIPE_SUBSCRIPTION_FUNCTION_NAME =
  process.env.FUNCTION_GETSTRIPESUBSCRIPTIONBYSUBSCRIPTIONID_NAME;
if (!GET_STRIPE_SUBSCRIPTION_FUNCTION_NAME) {
  throw new Error(
    `Function requires environment variable: 'FUNCTION_GETSTRIPESUBSCRIPTIONBYSUBSCRIPTIONID_NAME'`
  );
}

const lambda = new AWS.Lambda();

exports.handler = async (event) => {
  const resolvers = {
    Lesson: {
      customerUsername: (event) =>
        getCustomerUsernameByStudentAccountId(event.source.studentAccountId),
      studentUsername: (event) =>
        getStudentUsernameByStudentAccountId(event.source.studentAccountId),
      teacherUsername: (event) =>
        getTeacherUsernameByTeacherAccountId(event.source.teacherAccountId),
      stripeUsageRecord: (event) =>
        getStripeUsageRecord(event.source.stripeUsageRecordId),
    },
    StudentAccount: {
      customerUser: (event) => getUser(event.source.customerUsername),
      studentUser: (event) => getUser(event.source.studentUsername),
      stripeSubscription: (event) =>
        getSubscription(event.source.stripeSubscriptionId),
    },
    TeacherAccount: {
      teacherUser: (event) => getUser(event.source.teacherUsername),
      timekitResource: (event) =>
        getTimekitResource(event.source.timekitResourceId),
    },
  };
  const typeHandler = resolvers[event.typeName];
  if (typeHandler) {
    const resolver = typeHandler[event.fieldName];
    if (resolver) {
      return resolver(event);
    }
  }
  throw new Error("Resolver not found.");
};

function getStripeUsageRecord(stripeUsageRecordId) {
  // TODO: implement getStripeUsageRecord
}

function getSubscription(subscriptionId) {
  if (!subscriptionId) {
    return null;
  }
  return lambda
    .invoke({
      FunctionName: GET_STRIPE_SUBSCRIPTION_FUNCTION_NAME,
      Payload: JSON.stringify(subscriptionId),
    })
    .promise()
    .then((response) => {
      return JSON.parse(response.Payload);
    });
}

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

function getCustomerUsernameByStudentAccountId(accountId) {
  // TODO: implement getCustomerUsernameByStudentAccountId
}

function getStudentUsernameByStudentAccountId(accountId) {
  // TODO: implements getStudentUsernameByStudentAccountId
}

function getTeacherUsernameByTeacherAccountId(accountId) {
  // TODO: implement getTeacherUsernameByTeacherAccountId
}
