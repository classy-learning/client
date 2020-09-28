export default `
  query ListStudentAccounts {
    listStudentAccounts {
      items {
        id
        stripeSubscription {
          status
        }
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
