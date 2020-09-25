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
