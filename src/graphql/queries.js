/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCustomerAccount = /* GraphQL */ `
  query GetCustomerAccount($id: ID!) {
    getCustomerAccount(id: $id) {
      id
      customerUsername
      stripeCustomerId
      createdAt
      updatedAt
    }
  }
`;
export const listCustomerAccounts = /* GraphQL */ `
  query ListCustomerAccounts(
    $filter: ModelCustomerAccountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCustomerAccounts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        customerUsername
        stripeCustomerId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const customerAccountsByCustomerUsername = /* GraphQL */ `
  query CustomerAccountsByCustomerUsername(
    $customerUsername: ID
    $sortDirection: ModelSortDirection
    $filter: ModelCustomerAccountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    customerAccountsByCustomerUsername(
      customerUsername: $customerUsername
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        customerUsername
        stripeCustomerId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getStudentAccount = /* GraphQL */ `
  query GetStudentAccount($id: ID!) {
    getStudentAccount(id: $id) {
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
export const listStudentAccounts = /* GraphQL */ `
  query ListStudentAccounts(
    $filter: ModelStudentAccountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStudentAccounts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        updatedAt
        customerUsername
        customerUser {
          Username
          UserCreateDate
          UserLastModifiedDate
          Enabled
          UserStatus
          PreferredMfaSetting
          UserMFASettingList
        }
        studentUsername
        studentUser {
          Username
          UserCreateDate
          UserLastModifiedDate
          Enabled
          UserStatus
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
          status
        }
      }
      nextToken
    }
  }
`;
export const studentAccountsByCustomerUsername = /* GraphQL */ `
  query StudentAccountsByCustomerUsername(
    $customerUsername: ID
    $sortDirection: ModelSortDirection
    $filter: ModelStudentAccountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    studentAccountsByCustomerUsername(
      customerUsername: $customerUsername
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        updatedAt
        customerUsername
        customerUser {
          Username
          UserCreateDate
          UserLastModifiedDate
          Enabled
          UserStatus
          PreferredMfaSetting
          UserMFASettingList
        }
        studentUsername
        studentUser {
          Username
          UserCreateDate
          UserLastModifiedDate
          Enabled
          UserStatus
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
          status
        }
      }
      nextToken
    }
  }
`;
