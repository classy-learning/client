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
