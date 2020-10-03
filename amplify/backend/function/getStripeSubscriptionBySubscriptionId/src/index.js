const AWS = require("aws-sdk");
const stripe = require("stripe");

const STRIPE_API_KEY_SECRET_ID = "stripe-api-key";

const secretsManager = new AWS.SecretsManager();

exports.handler = async (event) => {
  const Stripe = await configureStripe();
  return Stripe.subscriptions.retrieve(event);
};

function configureStripe() {
  return secretsManager
    .getSecretValue({ SecretId: STRIPE_API_KEY_SECRET_ID })
    .promise()
    .then((secret) => {
      const stripeApiKey = JSON.parse(secret.SecretString)[
        STRIPE_API_KEY_SECRET_ID
      ];
      return stripe(stripeApiKey);
    });
}
