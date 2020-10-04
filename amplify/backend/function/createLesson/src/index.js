/* Amplify Params - DO NOT EDIT
	API_CLIENT_GRAPHQLAPIIDOUTPUT
	API_CLIENT_LESSONTABLE_ARN
	API_CLIENT_LESSONTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require("aws-sdk");
const timekit = require("timekit-sdk");

const TIMEKIT_API_KEY_SECRET_ID = "timekit-app-key";

const LESSON_TABLE_NAME = process.env.API_CLIENT_LESSONTABLE_NAME;
if (!LESSON_TABLE_NAME) {
  throw new Error(
    `Function requires environment variable: 'API_CLIENT_LESSONTABLE_NAME'`
  );
}

const documentClient = new AWS.DynamoDB.DocumentClient();
const secretsManager = new AWS.SecretsManager();

exports.handler = async (event) => {
  const teacherAccountId = event.arguments.input.teacherAccountId;
  const studentAccountId = event.arguments.input.studentAccountId;
  const start = event.arguments.input.start;
  const end = event.arguments.input.end;

  await configureTimekit();

  const teacherAccount = await getTeacherAccountById(teacherAccountId);

  const studentAccount = await getStudentAccountById(studentAccountId);

  // TODO: pass parameters necessary for zoom meeting creation
  const zoomMeeting = await createZoomMeeting();

  const timekitBooking = await createTimekitBooking(
    end,
    start,
    studentAccount.email,
    studentAccount.givenName,
    studentAccount.username,
    teacherAccount.givenName,
    teacherAccount.timekitResourceId,
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

function getStudentAccountById(studentAccountId) {
  // TODO: get student account by id
  // TODO: transform response into flat object
}

function getTeacherAccountById(teacherAccountId) {
  // TODO: get teacher account by id
  // TODO: transform response into flat object
}
