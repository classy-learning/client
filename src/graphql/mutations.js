/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createStudentAccount = /* GraphQL */ `
  mutation CreateStudentAccount(
    $input: CreateStudentAccountInput!
    $condition: ModelStudentAccountConditionInput
  ) {
    createStudentAccount(input: $input, condition: $condition) {
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
export const updateStudentAccount = /* GraphQL */ `
  mutation UpdateStudentAccount(
    $input: UpdateStudentAccountInput!
    $condition: ModelStudentAccountConditionInput
  ) {
    updateStudentAccount(input: $input, condition: $condition) {
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
export const deleteStudentAccount = /* GraphQL */ `
  mutation DeleteStudentAccount(
    $input: DeleteStudentAccountInput!
    $condition: ModelStudentAccountConditionInput
  ) {
    deleteStudentAccount(input: $input, condition: $condition) {
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
