export default `
  mutation CreateStudentAccount($input: CreateStudentAccountInput!) {
    createStudentAccount(input: $input) {
      studentUsername
    }
  }
`;
