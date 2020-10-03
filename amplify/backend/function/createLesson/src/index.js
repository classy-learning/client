/* Amplify Params - DO NOT EDIT
	API_CLIENT_GRAPHQLAPIIDOUTPUT
	API_CLIENT_LESSONTABLE_ARN
	API_CLIENT_LESSONTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require("aws-sdk");

const LESSON_TABLE_NAME = process.env.API_CLIENT_LESSONTABLE_NAME;
if (!LESSON_TABLE_NAME) {
  throw new Error(
    `Function requires environment variable: 'API_CLIENT_LESSONTABLE_NAME'`
  );
}

const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  // TODO: create booking in timekit
  // TODO: construct lesson object from timekit booking id
  // TODO: construct lesson object from event.arguments.input
  const lesson = {};

  await createLesson(lesson);

  return lesson;
};

function createLesson(lesson) {
  return documentClient
    .put({
      TableName: LESSON_TABLE_NAME,
      Item: lesson,
    })
    .promise();
}
