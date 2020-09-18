export default `
  query ListStudentAccounts {
    listStudentAccounts {
      items {
        id
        studentUser {
          UserAttributes {
            Name
            Value
          }
          Username
        }
      }
    }
  }
`;
