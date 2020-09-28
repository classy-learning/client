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
      createdAt
      updatedAt
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
      stripeSubscriptionId
      stripeSubscription {
        id
        cancel_at_period_end
        current_period_end
        current_period_start
        customer
        default_payment_method
        items {
          id
          quantity
          subscription
        }
        status
      }
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
      createdAt
      updatedAt
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
      stripeSubscriptionId
      stripeSubscription {
        id
        cancel_at_period_end
        current_period_end
        current_period_start
        customer
        default_payment_method
        items {
          id
          quantity
          subscription
        }
        status
      }
    }
  }
`;
export const onUpdateStudentAccount = /* GraphQL */ `
  subscription OnUpdateStudentAccount(
    $customerUsername: String
    $studentUsername: String
  ) {
    onUpdateStudentAccount(
      customerUsername: $customerUsername
      studentUsername: $studentUsername
    ) {
      id
      createdAt
      updatedAt
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
      stripeSubscriptionId
      stripeSubscription {
        id
        cancel_at_period_end
        current_period_end
        current_period_start
        customer
        default_payment_method
        items {
          id
          quantity
          subscription
        }
        status
      }
    }
  }
`;
