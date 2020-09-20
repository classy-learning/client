/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateStripeCustomer = /* GraphQL */ `
  subscription OnCreateStripeCustomer(
    $customerUsername: String
    $stripeCustomerId: String
  ) {
    onCreateStripeCustomer(
      customerUsername: $customerUsername
      stripeCustomerId: $stripeCustomerId
    ) {
      id
      customerUsername
      stripeCustomerId
      createdAt
      updatedAt
    }
  }
`;
export const onCreateStudentAccount = /* GraphQL */ `
  subscription OnCreateStudentAccount(
    $customerUsername: String
    $studentUsername: String
  ) {
    onCreateStudentAccount(
      customerUsername: $customerUsername
      studentUsername: $studentUsername
    ) {
      id
      customerUsername
      customerUser {
        Username
        UserAttributes {
          Name
          Value
        }
        UserCreateDate
        UserLastModifiedDate
        Enabled
        UserStatus
        MFAOptions {
          DeliveryMedium
          AttributeName
        }
        PreferredMfaSetting
        UserMFASettingList
      }
      studentUsername
      studentUser {
        Username
        UserAttributes {
          Name
          Value
        }
        UserCreateDate
        UserLastModifiedDate
        Enabled
        UserStatus
        MFAOptions {
          DeliveryMedium
          AttributeName
        }
        PreferredMfaSetting
        UserMFASettingList
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteStripeCustomer = /* GraphQL */ `
  subscription OnDeleteStripeCustomer(
    $customerUsername: String
    $stripeCustomerId: String
  ) {
    onDeleteStripeCustomer(
      customerUsername: $customerUsername
      stripeCustomerId: $stripeCustomerId
    ) {
      id
      customerUsername
      stripeCustomerId
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteStudentAccount = /* GraphQL */ `
  subscription OnDeleteStudentAccount(
    $customerUsername: String
    $studentUsername: String
  ) {
    onDeleteStudentAccount(
      customerUsername: $customerUsername
      studentUsername: $studentUsername
    ) {
      id
      customerUsername
      customerUser {
        Username
        UserAttributes {
          Name
          Value
        }
        UserCreateDate
        UserLastModifiedDate
        Enabled
        UserStatus
        MFAOptions {
          DeliveryMedium
          AttributeName
        }
        PreferredMfaSetting
        UserMFASettingList
      }
      studentUsername
      studentUser {
        Username
        UserAttributes {
          Name
          Value
        }
        UserCreateDate
        UserLastModifiedDate
        Enabled
        UserStatus
        MFAOptions {
          DeliveryMedium
          AttributeName
        }
        PreferredMfaSetting
        UserMFASettingList
      }
      createdAt
      updatedAt
    }
  }
`;
