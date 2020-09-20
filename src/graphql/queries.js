/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getStudentAccount = /* GraphQL */ `
  query GetStudentAccount($id: ID!) {
    getStudentAccount(id: $id) {
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
export const listStudentAccounts = /* GraphQL */ `
  query ListStudentAccounts(
    $filter: ModelStudentAccountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStudentAccounts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
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
        createdAt
        updatedAt
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getStripeCustomer = /* GraphQL */ `
  query GetStripeCustomer($id: ID!) {
    getStripeCustomer(id: $id) {
      id
      customerUsername
      stripeCustomerId
      createdAt
      updatedAt
    }
  }
`;
export const listStripeCustomers = /* GraphQL */ `
  query ListStripeCustomers(
    $filter: ModelStripeCustomerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStripeCustomers(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
export const stripeCustomersByCustomerUsername = /* GraphQL */ `
  query StripeCustomersByCustomerUsername(
    $customerUsername: ID
    $sortDirection: ModelSortDirection
    $filter: ModelStripeCustomerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    stripeCustomersByCustomerUsername(
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
