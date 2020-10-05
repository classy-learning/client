/* Amplify Params - DO NOT EDIT
	ENV
	FUNCTION_HASHTEACHERACCOUNTID_NAME
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require("aws-sdk");

const HASH_TEACHER_ACCOUNT_ID_FUNCTION_NAME =
  process.env.FUNCTION_HASHTEACHERACCOUNTID_NAME;
if (!HASH_TEACHER_ACCOUNT_ID_FUNCTION_NAME) {
  throw new Error(
    `Function requires environment variable: 'FUNCTION_HASHTEACHERACCOUNTID_NAME'`
  );
}

const lambda = new AWS.Lambda();

exports.handler = async (event) => {
  // TODO: get teacherAccountId from event
  const teacherAccountId = "";
  const teacherAccountIdHash = await hashTeacherAccountId(teacherAccountId);
  return getTimekitOnboardingLink(teacherAccountIdHash);
};

function getTimekitOnboardingLink(teacherAccountIdHash) {
  // TODO: create timekit onboarding link
  const timekitOnboardingUrl = "";
  const confirmResourceEndpoint = "";
  return timekitOnboardingUrl + confirmResourceEndpoint + teacherAccountIdHash;
}

function hashTeacherAccountId(teacherAccountId) {
  return lambda
    .invoke({
      FunctionName: HASH_TEACHER_ACCOUNT_ID_FUNCTION_NAME,
      Payload: JSON.stringify(teacherAccountId),
    })
    .promise()
    .then((response) => {
      return JSON.parse(response.Payload);
    });
}
