/* Amplify Params - DO NOT EDIT
	ENV
	FUNCTION_GETCOGNITOUSERBYUSERNAME_NAME
	FUNCTION_GETSTRIPESUBSCRIPTIONBYSUBSCRIPTIONID_NAME
	FUNCTION_GETSTUDENTACCOUNTBYIDQUERY_NAME
	FUNCTION_GETTEACHERACCOUNTBYIDQUERY_NAME
	FUNCTION_GETTIMEKITBOOKINGBYID_NAME
	FUNCTION_GETTIMEKITRESOURCEBYID_NAME
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require("aws-sdk");

// TODO: abstract common code to a getEnvData() function layer
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

const GET_STUDENT_ACCOUNT_FUNCTION_NAME =
  process.env.FUNCTION_GETSTUDENTACCOUNTBYIDQUERY_NAME;
if (!GET_STUDENT_ACCOUNT_FUNCTION_NAME) {
  throw new Error(
    `Function requires environment variable: 'FUNCTION_GETSTUDENTACCOUNTBYIDQUERY_NAME'`
  );
}

const GET_TEACHER_ACCOUNT_FUNCTION_NAME =
  process.env.FUNCTION_GETTEACHERACCOUNTBYIDQUERY_NAME;
if (!GET_TEACHER_ACCOUNT_FUNCTION_NAME) {
  throw new Error(
    `Function requires environment variable: 'FUNCTION_GETTEACHERACCOUNTBYIDQUERY_NAME'`
  );
}

const GET_TIMEKIT_BOOKING_FUNCTION_NAME =
  process.env.FUNCTION_GETTIMEKITBOOKINGBYID_NAME;
if (!GET_TIMEKIT_BOOKING_FUNCTION_NAME) {
  throw new Error(
    `Function requires environment variable: 'FUNCTION_GETTIMEKITBOOKINGBYID_NAME'`
  );
}

const GET_TIMEKIT_RESOURCE_FUNCTION_NAME =
  process.env.FUNCTION_GETTIMEKITRESOURCEBYID_NAME;
if (!GET_TIMEKIT_RESOURCE_FUNCTION_NAME) {
  throw new Error(
    `Function requires environment variable: 'FUNCTION_GETTIMEKITRESOURCEBYID_NAME'`
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
      timekitBooking: (event) =>
        getTimekitBooking(event.source.timekitBookingId),
    },
    StudentAccount: {
      customerUser: (event) => getCognitoUser(event.source.customerUsername),
      studentUser: (event) => getCognitoUser(event.source.studentUsername),
      stripeSubscription: (event) =>
        getStripeSubscription(event.source.stripeSubscriptionId),
    },
    TeacherAccount: {
      teacherUser: (event) => getCognitoUser(event.source.teacherUsername),
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

// TODO: abstract common code (lambda invokepromisethen) to an invokeLambda() function layer
function getCognitoUser(username) {
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

function getCustomerUsernameByStudentAccountId(studentAccountId) {
  return getStudentAccountByIdQuery(
    studentAccountId,
    `{
      customerUsername
    }`
  );
}

function getStripeSubscription(stripeSubscriptionId) {
  if (!stripeSubscriptionId) {
    return null;
  }
  return lambda
    .invoke({
      FunctionName: GET_STRIPE_SUBSCRIPTION_FUNCTION_NAME,
      Payload: JSON.stringify(stripeSubscriptionId),
    })
    .promise()
    .then((response) => {
      return JSON.parse(response.Payload);
    });
}

function getStudentAccountByIdQuery(studentAccountId, responseStructure) {
  return lambda
    .invoke({
      FunctionName: GET_STUDENT_ACCOUNT_FUNCTION_NAME,
      Payload: JSON.stringify({
        studentAccountId: studentAccountId,
        responseStructure: responseStructure,
      }),
    })
    .promise()
    .then((response) => {
      return JSON.parse(response.Payload);
    });
}

function getStudentUsernameByStudentAccountId(studentAccountId) {
  return getStudentAccountByIdQuery(
    studentAccountId,
    `{
      studentUsername
    }`
  );
}

function getTeacherAccountByIdQuery(teacherAccountId, responseStructure) {
  return lambda
    .invoke({
      FunctionName: GET_STUDENT_ACCOUNT_FUNCTION_NAME,
      Payload: JSON.stringify({
        studentAccountId: teacherAccountId,
        responseStructure: responseStructure,
      }),
    })
    .promise()
    .then((response) => {
      return JSON.parse(response.Payload);
    });
}

function getTeacherUsernameByTeacherAccountId(teacherAccountId) {
  return getStudentAccountByIdQuery(
    teacherAccountId,
    `{
      teacherUsername
    }`
  );
}

function getTimekitBooking(timekitBookingId) {
  if (!timekitBookingId) {
    return null;
  }
  return lambda
    .invoke({
      FunctionName: GET_TIMEKIT_BOOKING_FUNCTION_NAME,
      Payload: JSON.stringify(timekitBookingId),
    })
    .promise()
    .then((response) => {
      return JSON.parse(response.Payload);
    });
}

function getTimekitResource(timekitResourceId) {
  if (!timekitResourceId) {
    return null;
  }
  return lambda
    .invoke({
      FunctionName: GET_TIMEKIT_RESOURCE_FUNCTION_NAME,
      Payload: JSON.stringify(timekitResourceId),
    })
    .promise()
    .then((response) => {
      return JSON.parse(response.Payload);
    });
}
