/* Amplify Params - DO NOT EDIT
	API_CLIENT_GRAPHQLAPIIDOUTPUT
	API_CLIENT_LESSONTABLE_ARN
	API_CLIENT_LESSONTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

exports.handler = async (event) => {
  // TODO: implement
  const response = {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*"
    //  },
    body: JSON.stringify("Hello from Lambda!"),
  };
  return response;
};
