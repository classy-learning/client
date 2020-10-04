getTeacherAccountByIdQuery; /* Amplify Params - DO NOT EDIT
	API_CLIENT_GRAPHQLAPIIDOUTPUT
	API_CLIENT_LESSONTABLE_ARN
	API_CLIENT_LESSONTABLE_NAME
	ENV
	FUNCTION_GETSTUDENTACCOUNTBYIDQUERY_NAME
	FUNCTION_GETTEACHERACCOUNTBYIDQUERY_NAME
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require("aws-sdk");
const timekit = require("timekit-sdk");

const TIMEKIT_API_KEY_SECRET_ID = "timekit-app-key";

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

const LESSON_TABLE_NAME = process.env.API_CLIENT_LESSONTABLE_NAME;
if (!LESSON_TABLE_NAME) {
  throw new Error(
    `Function requires environment variable: 'API_CLIENT_LESSONTABLE_NAME'`
  );
}

const documentClient = new AWS.DynamoDB.DocumentClient();
const secretsManager = new AWS.SecretsManager();

exports.handler = async (event) => {
  await configureTimekit();

  const teacherAccountId = event.arguments.input.teacherAccountId;
  const studentAccountId = event.arguments.input.studentAccountId;
  const start = event.arguments.input.start;
  const end = event.arguments.input.end;

  const teacherData = await getLessonInputTeacherData(teacherAccountId);
  const studentData = await getLessonInputStudentData(studentAccountId);

  // TODO: pass parameters necessary for zoom meeting creation
  const zoomMeeting = await createZoomMeeting();

  const timekitBooking = await createTimekitBooking(
    end,
    start,
    studentData.email,
    studentData.givenName,
    studentData.username,
    teacherData.givenName,
    teacherData.timekitResourceId,
    zoomMeeting.url // TODO: pass actual zoom meeting url
  );

  const lessonRecord = {
    id: event.lessonId,
    studentAccountId: studentAccountId,
    teacherAccountId: teacherAccountId,
    timekitBookingId: timekitBooking.id,
    zoomMeetingId: zoomMeeting.id,
  };

  await createLessonRecord(lessonRecord);

  return lessonRecord;
};

function configureTimekit() {
  return secretsManager
    .getSecretValue({ SecretId: TIMEKIT_API_KEY_SECRET_ID })
    .promise()
    .then((secret) => {
      const timekitApiKey = JSON.parse(secret.SecretString)[
        TIMEKIT_API_KEY_SECRET_ID
      ];
      timekit.configure({ appKey: timekitApiKey });
    });
}

function createTimekitBooking(
  end,
  start,
  studentEmail,
  studentGivenName,
  studentUsername,
  teacherGivenName,
  timekitResourceId,
  zoomMeetingLink
) {
  return timekit
    .createBooking({
      resource_id: timekitResourceId,
      graph: "instant",
      start: start,
      end: end,
      what: "Lesson",
      where: zoomMeetingLink,
      description: `${studentGivenName}'s lesson with ${teacherGivenName}.`,
      customer: {
        name: studentUsername,
        email: studentEmail,
      },
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((response) => {
      console.log(response);
    });
}

function createLessonRecord(lessonRecord) {
  return documentClient
    .put({
      TableName: LESSON_TABLE_NAME,
      Item: lessonRecord,
    })
    .promise();
}

function createZoomMeeting() {
  // TODO: create zoom meeting at given time between participants
}

function getLessonInputStudentData(studentAccountId) {
  return getStudentAccountByIdQuery(
    studentAccountId,
    `{
      studentUsername
      studentUser {
        UserAttributes {
          Name
          Value
        }
      }
    }`
  ).then((response) => {
    const userAttributes = mapCognitoUserAttributes(
      response.studentUser.userAttributes
    );
    return {
      email: userAttributes.email,
      givenName: userAttributes.given_name,
      username: response.studentUsername,
    };
  });
}

function getLessonInputTeacherData(teacherAccountId) {
  return getTeacherAccountByIdQuery(
    teacherAccountId,
    `{
      teacherUsername
      timekitResourceId
    }`
  );
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
      const result = JSON.parse(response.Payload);
    });
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
      const result = JSON.parse(response.Payload);
    });
}

function mapCognitoUserAttributes(userAttributes) {
  const result = {};
  userAttributes.forEach((attribute, i) => {
    result[attribute.name] = attribute.value;
  });
  return result;
}
