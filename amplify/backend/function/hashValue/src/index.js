/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require("aws-sdk");
const Cryptr = require("cryptr");

const secretsManager = new AWS.SecretsManager();

exports.handler = async (event) => {
  const cryptr = await configureCryptr(event.key);
  return cryptr.encrypt(event.value);
};

function configureCryptr(secretKey) {
  return secretsManager
    .getSecretValue({ SecretId: secretKey })
    .promise()
    .then((secret) => {
      const secret = JSON.parse(secret.SecretString)[secretKey];
      return new Cryptr(secret);
    });
}
