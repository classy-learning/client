/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateStudentAccount = /* GraphQL */ `
  subscription OnCreateStudentAccount($customerId: String, $studentId: String) {
    onCreateStudentAccount(customerId: $customerId, studentId: $studentId) {
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
export const onDeleteStudentAccount = /* GraphQL */ `
  subscription OnDeleteStudentAccount($customerId: String, $studentId: String) {
    onDeleteStudentAccount(customerId: $customerId, studentId: $studentId) {
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
