/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCustomerAccount = /* GraphQL */ `
  subscription OnCreateCustomerAccount(
    $customerUsername: String
    $customerAccountId: String
  ) {
    onCreateCustomerAccount(
      customerUsername: $customerUsername
      customerAccountId: $customerAccountId
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
export const onDeleteCustomerAccount = /* GraphQL */ `
  subscription OnDeleteCustomerAccount(
    $customerUsername: String
    $customerAccountId: String
  ) {
    onDeleteCustomerAccount(
      customerUsername: $customerUsername
      customerAccountId: $customerAccountId
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
