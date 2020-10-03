/* Amplify Params - DO NOT EDIT
	ENV
	FUNCTION_GETCOGNITOUSERBYUSERNAME_NAME
	FUNCTION_GETCUSTOMERUSERNAMEBYSTUDENTACCOUNTIDQUERY_NAME
	FUNCTION_GETSTRIPESUBSCRIPTIONBYSUBSCRIPTIONID_NAME
	FUNCTION_GETSTUDENTUSERNAMEBYSTUDENTACCOUNTIDQUERY_NAME
	FUNCTION_GETTEACHERUSERNAMEBYTEACHERACCOUNTIDQUERY_NAME
	FUNCTION_GETTIMEKITBOOKINGBYID_NAME
	FUNCTION_GETTIMEKITRESOURCEBYID_NAME
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require("aws-sdk");

// TODO: abstract common code to a getEnvData() function?
const GET_COGNITO_USER_FUNCTION_NAME =
  process.env.FUNCTION_GETCOGNITOUSERBYUSERNAME_NAME;
if (!GET_COGNITO_USER_FUNCTION_NAME) {
  throw new Error(
    `Function requires environment variable: 'FUNCTION_GETCOGNITOUSERBYUSERNAME_NAME'`
  );
}

const GET_CUSTOMER_USERNAME_FUNCTION_NAME =
  process.env.FUNCTION_GETCUSTOMERUSERNAMEBYSTUDENTACCOUNTIDQUERY_NAME;
if (!GET_CUSTOMER_USERNAME_FUNCTION_NAME) {
  throw new Error(
    `Function requires environment variable: 'FUNCTION_GETCUSTOMERUSERNAMEBYSTUDENTACCOUNTIDQUERY_NAME'`
  );
}

const GET_STRIPE_SUBSCRIPTION_FUNCTION_NAME =
  process.env.FUNCTION_GETSTRIPESUBSCRIPTIONBYSUBSCRIPTIONID_NAME;
if (!GET_STRIPE_SUBSCRIPTION_FUNCTION_NAME) {
  throw new Error(
    `Function requires environment variable: 'FUNCTION_GETSTRIPESUBSCRIPTIONBYSUBSCRIPTIONID_NAME'`
  );
}

const GET_STUDENT_USERNAME_FUNCTION_NAME =
  process.env.FUNCTION_GETSTUDENTUSERNAMEBYSTUDENTACCOUNTIDQUERY_NAME;
if (!GET_STUDENT_USERNAME_FUNCTION_NAME) {
  throw new Error(
    `Function requires environment variable: 'FUNCTION_GETSTUDENTUSERNAMEBYSTUDENTACCOUNTIDQUERY_NAME'`
  );
}

const GET_TEACHER_USERNAME_FUNCTION_NAME =
  process.env.FUNCTION_GETTEACHERUSERNAMEBYTEACHERACCOUNTIDQUERY_NAME;
if (!GET_TEACHER_USERNAME_FUNCTION_NAME) {
  throw new Error(
    `Function requires environment variable: 'FUNCTION_GETTEACHERUSERNAMEBYTEACHERACCOUNTIDQUERY_NAME'`
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

// TODO: abstract common code to an invokeLambda() function?
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
  return lambda
    .invoke({
      FunctionName: GET_CUSTOMER_USERNAME_FUNCTION_NAME,
      Payload: JSON.stringify(studentAccountId),
    })
    .promise()
    .then((response) => {
      return JSON.parse(response.Payload);
    });
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

function getStudentUsernameByStudentAccountId(studentAccountId) {
  return lambda
    .invoke({
      FunctionName: GET_STUDENT_USERNAME_FUNCTION_NAME,
      Payload: JSON.stringify(studentAccountId),
    })
    .promise()
    .then((response) => {
      return JSON.parse(response.Payload);
    });
}

function getTeacherUsernameByTeacherAccountId(teacherAccountId) {
  return lambda
    .invoke({
      FunctionName: GET_TEACHER_USERNAME_FUNCTION_NAME,
      Payload: JSON.stringify(teacherAccountId),
    })
    .promise()
    .then((response) => {
      return JSON.parse(response.Payload);
    });
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
