/* Amplify Params - DO NOT EDIT
	API_CLIENT_GRAPHQLAPIENDPOINTOUTPUT
	API_CLIENT_GRAPHQLAPIIDOUTPUT
	AUTH_CLIENT01A53182_USERPOOLID
Amplify Params - DO NOT EDIT */

// TODO: get username from event
// TODO: get/create stripe customer from api
// TODO: create stripe checkout session with stripeCustomerId

exports.handler = async (event) => {
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify("Hello from Lambda!"),
  };
};
