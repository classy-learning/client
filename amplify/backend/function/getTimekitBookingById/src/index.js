const AWS = require("aws-sdk");
const timekit = require("timekit-sdk");

const TIMEKIT_API_KEY_SECRET_ID = "timekit-app-key";

const secretsManager = new AWS.SecretsManager();

exports.handler = async (event) => {
  await configureTimekit();
  return getBookingByBookingId(event);
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

function getBookingByBookingId(bookingId) {
  console.log(bookingId);
  if (!bookingId) {
    return null;
  }
  return timekit
    .getBooking({ id: bookingId })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((response) => {
      console.log(response);
      console.log(response);
    });
}
