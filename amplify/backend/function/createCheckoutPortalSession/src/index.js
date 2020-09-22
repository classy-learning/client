/* Amplify Params - DO NOT EDIT
	ENV
	FUNCTION_GETUSERNAMEFROMAUTHPROVIDER_NAME
	REGION
Amplify Params - DO NOT EDIT */

// TODO: get/create stripe customer from api
// TODO: create stripe checkout session with stripeCustomerId

const AWS = require("aws-sdk");

const GET_USERNAME_FUNCTION_NAME =
  process.env.FUNCTION_GETUSERNAMEFROMAUTHPROVIDER_NAME;
if (!GET_USERNAME_FUNCTION_NAME) {
  throw new Error(
    `Function requires environment variable: 'FUNCTION_GETUSERNAMEFROMAUTHPROVIDER_NAME'`
  );
}

const lambda = new AWS.Lambda();

exports.handler = async (event) => {
  const username = await getUsername(event);
  console.log(username);
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify("Hello from Lambda!"),
  };
};

function getUsername(event) {
  return lambda
    .invoke({
      FunctionName: GET_USERNAME_FUNCTION_NAME,
      Payload: JSON.stringify(event),
    })
    .promise()
    .then((response) => {
      return JSON.parse(response.Payload);
    });
}
