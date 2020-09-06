/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createStudentAccount = /* GraphQL */ `
  mutation CreateStudentAccount(
    $input: CreateStudentAccountInput!
    $condition: ModelStudentAccountConditionInput
  ) {
    createStudentAccount(input: $input, condition: $condition) {
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
export const deleteStudentAccount = /* GraphQL */ `
  mutation DeleteStudentAccount(
    $input: DeleteStudentAccountInput!
    $condition: ModelStudentAccountConditionInput
  ) {
    deleteStudentAccount(input: $input, condition: $condition) {
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
