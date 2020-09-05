/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getStudentAccount = /* GraphQL */ `
  query GetStudentAccount($id: ID!) {
    getStudentAccount(id: $id) {
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
export const listStudentAccounts = /* GraphQL */ `
  query ListStudentAccounts(
    $filter: ModelStudentAccountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStudentAccounts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
