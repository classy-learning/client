/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCustomerAccount = /* GraphQL */ `
  subscription OnCreateCustomerAccount(
    $customerUsername: String
    $customerAccountId: String
  ) {
    onCreateCustomerAccount(
      customerUsername: $customerUsername
      customerAccountId: $customerAccountId
    ) {
      id
      customerUsername
      stripeCustomerId
      createdAt
      updatedAt
    }
  }
`;
export const onCreateStudentAccount = /* GraphQL */ `
  subscription OnCreateStudentAccount(
    $customerUsername: String
    $studentUsername: String
  ) {
    onCreateStudentAccount(
      customerUsername: $customerUsername
      studentUsername: $studentUsername
    ) {
      id
      createdAt
      updatedAt
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
      stripeSubscriptionId
      stripeSubscription {
        id
        cancel_at_period_end
        current_period_end
        current_period_start
        customer
        default_payment_method
        items {
          id
          quantity
          subscription
        }
        status
      }
    }
  }
`;
export const onCreateTeacherAccount = /* GraphQL */ `
  subscription OnCreateTeacherAccount(
    $teacherUsername: String
    $teacherAccountId: String
  ) {
    onCreateTeacherAccount(
      teacherUsername: $teacherUsername
      teacherAccountId: $teacherAccountId
    ) {
      id
      teacherUsername
      teacherUser {
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
      topics {
        items {
          id
          teacherAccountId
          topicId
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const onDeleteCustomerAccount = /* GraphQL */ `
  subscription OnDeleteCustomerAccount(
    $customerUsername: String
    $customerAccountId: String
  ) {
    onDeleteCustomerAccount(
      customerUsername: $customerUsername
      customerAccountId: $customerAccountId
    ) {
      id
      customerUsername
      stripeCustomerId
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteStudentAccount = /* GraphQL */ `
  subscription OnDeleteStudentAccount(
    $customerUsername: String
    $studentUsername: String
  ) {
    onDeleteStudentAccount(
      customerUsername: $customerUsername
      studentUsername: $studentUsername
    ) {
      id
      createdAt
      updatedAt
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
      stripeSubscriptionId
      stripeSubscription {
        id
        cancel_at_period_end
        current_period_end
        current_period_start
        customer
        default_payment_method
        items {
          id
          quantity
          subscription
        }
        status
      }
    }
  }
`;
export const onDeleteTeacherAccount = /* GraphQL */ `
  subscription OnDeleteTeacherAccount(
    $teacherUsername: String
    $teacherAccountId: String
  ) {
    onDeleteTeacherAccount(
      teacherUsername: $teacherUsername
      teacherAccountId: $teacherAccountId
    ) {
      id
      teacherUsername
      teacherUser {
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
      topics {
        items {
          id
          teacherAccountId
          topicId
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const onUpdateStudentAccount = /* GraphQL */ `
  subscription OnUpdateStudentAccount(
    $customerUsername: String
    $studentUsername: String
  ) {
    onUpdateStudentAccount(
      customerUsername: $customerUsername
      studentUsername: $studentUsername
    ) {
      id
      createdAt
      updatedAt
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
      stripeSubscriptionId
      stripeSubscription {
        id
        cancel_at_period_end
        current_period_end
        current_period_start
        customer
        default_payment_method
        items {
          id
          quantity
          subscription
        }
        status
      }
    }
  }
`;
export const onCreateResource = /* GraphQL */ `
  subscription OnCreateResource {
    onCreateResource {
      id
      name
      description
      url
      createdAt
      updatedAt
      version
      resourceTopics {
        items {
          id
          resourceId
          topicId
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const onUpdateResource = /* GraphQL */ `
  subscription OnUpdateResource {
    onUpdateResource {
      id
      name
      description
      url
      createdAt
      updatedAt
      version
      resourceTopics {
        items {
          id
          resourceId
          topicId
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const onDeleteResource = /* GraphQL */ `
  subscription OnDeleteResource {
    onDeleteResource {
      id
      name
      description
      url
      createdAt
      updatedAt
      version
      resourceTopics {
        items {
          id
          resourceId
          topicId
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const onCreateResourceTopic = /* GraphQL */ `
  subscription OnCreateResourceTopic {
    onCreateResourceTopic {
      id
      resourceId
      topicId
      createdAt
      updatedAt
      resource {
        id
        name
        description
        url
        createdAt
        updatedAt
        version
        resourceTopics {
          nextToken
        }
      }
      topic {
        id
        name
        description
        createdAt
        updatedAt
        version
        resourceTopics {
          nextToken
        }
        teachableTopics {
          nextToken
        }
      }
    }
  }
`;
export const onUpdateResourceTopic = /* GraphQL */ `
  subscription OnUpdateResourceTopic {
    onUpdateResourceTopic {
      id
      resourceId
      topicId
      createdAt
      updatedAt
      resource {
        id
        name
        description
        url
        createdAt
        updatedAt
        version
        resourceTopics {
          nextToken
        }
      }
      topic {
        id
        name
        description
        createdAt
        updatedAt
        version
        resourceTopics {
          nextToken
        }
        teachableTopics {
          nextToken
        }
      }
    }
  }
`;
export const onDeleteResourceTopic = /* GraphQL */ `
  subscription OnDeleteResourceTopic {
    onDeleteResourceTopic {
      id
      resourceId
      topicId
      createdAt
      updatedAt
      resource {
        id
        name
        description
        url
        createdAt
        updatedAt
        version
        resourceTopics {
          nextToken
        }
      }
      topic {
        id
        name
        description
        createdAt
        updatedAt
        version
        resourceTopics {
          nextToken
        }
        teachableTopics {
          nextToken
        }
      }
    }
  }
`;
export const onCreateTeachableTopic = /* GraphQL */ `
  subscription OnCreateTeachableTopic {
    onCreateTeachableTopic {
      id
      teacherAccountId
      teacherAccount {
        id
        teacherUsername
        teacherUser {
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
        topics {
          nextToken
        }
      }
      topicId
      createdAt
      updatedAt
      topic {
        id
        name
        description
        createdAt
        updatedAt
        version
        resourceTopics {
          nextToken
        }
        teachableTopics {
          nextToken
        }
      }
    }
  }
`;
export const onUpdateTeachableTopic = /* GraphQL */ `
  subscription OnUpdateTeachableTopic {
    onUpdateTeachableTopic {
      id
      teacherAccountId
      teacherAccount {
        id
        teacherUsername
        teacherUser {
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
        topics {
          nextToken
        }
      }
      topicId
      createdAt
      updatedAt
      topic {
        id
        name
        description
        createdAt
        updatedAt
        version
        resourceTopics {
          nextToken
        }
        teachableTopics {
          nextToken
        }
      }
    }
  }
`;
export const onDeleteTeachableTopic = /* GraphQL */ `
  subscription OnDeleteTeachableTopic {
    onDeleteTeachableTopic {
      id
      teacherAccountId
      teacherAccount {
        id
        teacherUsername
        teacherUser {
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
        topics {
          nextToken
        }
      }
      topicId
      createdAt
      updatedAt
      topic {
        id
        name
        description
        createdAt
        updatedAt
        version
        resourceTopics {
          nextToken
        }
        teachableTopics {
          nextToken
        }
      }
    }
  }
`;
export const onCreateTopic = /* GraphQL */ `
  subscription OnCreateTopic {
    onCreateTopic {
      id
      name
      description
      createdAt
      updatedAt
      version
      resourceTopics {
        items {
          id
          resourceId
          topicId
          createdAt
          updatedAt
        }
        nextToken
      }
      teachableTopics {
        items {
          id
          teacherAccountId
          topicId
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const onUpdateTopic = /* GraphQL */ `
  subscription OnUpdateTopic {
    onUpdateTopic {
      id
      name
      description
      createdAt
      updatedAt
      version
      resourceTopics {
        items {
          id
          resourceId
          topicId
          createdAt
          updatedAt
        }
        nextToken
      }
      teachableTopics {
        items {
          id
          teacherAccountId
          topicId
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const onDeleteTopic = /* GraphQL */ `
  subscription OnDeleteTopic {
    onDeleteTopic {
      id
      name
      description
      createdAt
      updatedAt
      version
      resourceTopics {
        items {
          id
          resourceId
          topicId
          createdAt
          updatedAt
        }
        nextToken
      }
      teachableTopics {
        items {
          id
          teacherAccountId
          topicId
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
