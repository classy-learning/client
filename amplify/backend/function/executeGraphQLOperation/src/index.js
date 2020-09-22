/* Amplify Params - DO NOT EDIT
	API_CLIENT_GRAPHQLAPIENDPOINTOUTPUT
	API_CLIENT_GRAPHQLAPIIDOUTPUT
Amplify Params - DO NOT EDIT */

const AWS = require("aws-sdk");
const https = require("https");
const urlParse = require("url").URL;

const APPSYNC_URL = process.env.API_CLIENT_GRAPHQLAPIENDPOINTOUTPUT;
if (!APPSYNC_URL) {
  throw new Error(
    `Function requires environment variable: 'API_CLIENT_GRAPHQLAPIENDPOINTOUTPUT'`
  );
}

const REGION = process.env.REGION;
if (!REGION) {
  throw new Error(`Function requires environment variable: 'REGION'`);
}

const endpoint = new urlParse(APPSYNC_URL).hostname.toString();

exports.handler = async (event) => {
  return executeGraphQLOperation(
    event.operation,
    event.operationName,
    event.item
  );
};

function executeGraphQLOperation(operation, operationName, item) {
  const request = new AWS.HttpRequest(APPSYNC_URL, REGION);

  request.method = "POST";
  request.path = "/graphql";
  request.headers.host = endpoint;
  request.headers["Content-Type"] = "application/json";
  request.body = JSON.stringify({
    query: operation,
    operationName: operationName,
    variables: item,
  });

  const signer = new AWS.Signers.V4(request, "appsync", true);
  signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());

  return new Promise((resolve, reject) => {
    const httpRequest = https.request(
      { ...request, host: endpoint },
      (result) => {
        result.on("data", (data) => {
          resolve(JSON.parse(data.toString()));
        });
      }
    );
    httpRequest.write(request.body);
    httpRequest.end();
  });
}
