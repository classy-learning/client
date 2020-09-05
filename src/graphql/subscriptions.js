/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateStudentAccount = /* GraphQL */ `
  subscription OnCreateStudentAccount($customerId: String, $studentId: String) {
    onCreateStudentAccount(customerId: $customerId, studentId: $studentId) {
      id
      customerId
      customer {
        id
      }
      studentId
      student {
        id
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateStudentAccount = /* GraphQL */ `
  subscription OnUpdateStudentAccount($customerId: String, $studentId: String) {
    onUpdateStudentAccount(customerId: $customerId, studentId: $studentId) {
      id
      customerId
      customer {
        id
      }
      studentId
      student {
        id
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
      customerId
      customer {
        id
      }
      studentId
      student {
        id
      }
      createdAt
      updatedAt
    }
  }
`;
