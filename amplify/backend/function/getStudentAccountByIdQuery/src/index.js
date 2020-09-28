/* Amplify Params - DO NOT EDIT
	ENV
	FUNCTION_EXECUTEGRAPHQLOPERATION_NAME
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require("aws-sdk");

const EXECUTE_GQL_OPERATION_FUNCTION_NAME =
  process.env.FUNCTION_EXECUTEGRAPHQLOPERATION_NAME;
if (!EXECUTE_GQL_OPERATION_FUNCTION_NAME) {
  throw new Error(
    `Function requires environment variable: 'FUNCTION_EXECUTEGRAPHQLOPERATION_NAME'`
  );
}

const lambda = new AWS.Lambda();

exports.handler = async (event) => {
  return getStudentAccount(event);
};

function getStudentAccount(studentAccountId) {
  return executeGraphQLOperation(
    `query GetStudentAccount(
      $id: ID!
    ) {
      getStudentAccount(id: $id) {
        createdAt
        customerUsername
        id
        stripeSubscriptionId
        studentUsername
        updatedAt
        studentUser {
          Username
          UserStatus
          UserMFASettingList
          UserLastModifiedDate
          UserCreateDate
          UserAttributes {
            Name
            Value
          }
          PreferredMfaSetting
          MFAOptions {
            AttributeName
            DeliveryMedium
          }
          Enabled
        }
        stripeSubscription {
          cancel_at_period_end
          current_period_end
          current_period_start
          customer
          default_payment_method
          id
          status
          items {
            id
            quantity
            subscription
            price {
              unit_amount
              type
              id
              recurring {
                aggregate_usage
                interval
                interval_count
                usage_type
              }
              product {
                description
                id
                name
                unit_label
              }
            }
          }
        }
        customerUser {
          Enabled
          PreferredMfaSetting
          UserCreateDate
          UserLastModifiedDate
          UserMFASettingList
          UserStatus
          Username
          UserAttributes {
            Name
            Value
          }
          MFAOptions {
            AttributeName
            DeliveryMedium
          }
        }
      }
    }`,
    "GetStudentAccount",
    { id: studentAccountId }
  ).then((response) => {
    return response.data.getStudentAccount;
  });
}

function executeGraphQLOperation(operation, operationName, item) {
  return lambda
    .invoke({
      FunctionName: EXECUTE_GQL_OPERATION_FUNCTION_NAME,
      Payload: JSON.stringify({
        operation: operation,
        operationName: operationName,
        item: item,
      }),
    })
    .promise()
    .then((response) => {
      return JSON.parse(response.Payload);
    });
}
