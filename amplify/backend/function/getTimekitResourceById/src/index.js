const AWS = require("aws-sdk");
const timekit = require("timekit-sdk");

const TIMEKIT_API_KEY_SECRET_ID = "timekit-app-key";

const secretsManager = new AWS.SecretsManager();

exports.handler = async (event) => {
  await configureTimekit();
  return getResourceByResourceId(event);
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

function getResourceByResourceId(resourceId) {
  console.log(resourceId);
  if (!resourceId) {
    return null;
  }
  return timekit
    .getResource({ id: resourceId })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((response) => {
      console.log(response);
      console.log(response);
    });
}
