/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCustomerAccount = /* GraphQL */ `
  mutation CreateCustomerAccount(
    $input: CreateCustomerAccountInput!
    $condition: ModelCustomerAccountConditionInput
  ) {
    createCustomerAccount(input: $input, condition: $condition) {
      id
      customerUsername
      stripeCustomerId
      createdAt
      updatedAt
    }
  }
`;
export const createStudentAccount = /* GraphQL */ `
  mutation CreateStudentAccount(
    $input: CreateStudentAccountInput!
    $condition: ModelStudentAccountConditionInput
  ) {
    createStudentAccount(input: $input, condition: $condition) {
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
export const createTeacherAccount = /* GraphQL */ `
  mutation CreateTeacherAccount(
    $input: CreateTeacherAccountInput!
    $condition: ModelTeacherAccountConditionInput
  ) {
    createTeacherAccount(input: $input, condition: $condition) {
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
export const deleteCustomerAccount = /* GraphQL */ `
  mutation DeleteCustomerAccount(
    $input: DeleteCustomerAccountInput!
    $condition: ModelCustomerAccountConditionInput
  ) {
    deleteCustomerAccount(input: $input, condition: $condition) {
      id
      customerUsername
      stripeCustomerId
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
export const deleteTeacherAccount = /* GraphQL */ `
  mutation DeleteTeacherAccount(
    $input: DeleteTeacherAccountInput!
    $condition: ModelTeacherAccountConditionInput
  ) {
    deleteTeacherAccount(input: $input, condition: $condition) {
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
export const updateStudentAccount = /* GraphQL */ `
  mutation UpdateStudentAccount($input: UpdateStudentAccountInput!) {
    updateStudentAccount(input: $input) {
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
export const createResource = /* GraphQL */ `
  mutation CreateResource(
    $input: CreateResourceInput!
    $condition: ModelResourceConditionInput
  ) {
    createResource(input: $input, condition: $condition) {
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
export const updateResource = /* GraphQL */ `
  mutation UpdateResource(
    $input: UpdateResourceInput!
    $condition: ModelResourceConditionInput
  ) {
    updateResource(input: $input, condition: $condition) {
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
export const deleteResource = /* GraphQL */ `
  mutation DeleteResource(
    $input: DeleteResourceInput!
    $condition: ModelResourceConditionInput
  ) {
    deleteResource(input: $input, condition: $condition) {
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
export const createResourceTopic = /* GraphQL */ `
  mutation CreateResourceTopic(
    $input: CreateResourceTopicInput!
    $condition: ModelResourceTopicConditionInput
  ) {
    createResourceTopic(input: $input, condition: $condition) {
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
export const updateResourceTopic = /* GraphQL */ `
  mutation UpdateResourceTopic(
    $input: UpdateResourceTopicInput!
    $condition: ModelResourceTopicConditionInput
  ) {
    updateResourceTopic(input: $input, condition: $condition) {
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
export const deleteResourceTopic = /* GraphQL */ `
  mutation DeleteResourceTopic(
    $input: DeleteResourceTopicInput!
    $condition: ModelResourceTopicConditionInput
  ) {
    deleteResourceTopic(input: $input, condition: $condition) {
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
export const createTeachableTopic = /* GraphQL */ `
  mutation CreateTeachableTopic(
    $input: CreateTeachableTopicInput!
    $condition: ModelTeachableTopicConditionInput
  ) {
    createTeachableTopic(input: $input, condition: $condition) {
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
export const updateTeachableTopic = /* GraphQL */ `
  mutation UpdateTeachableTopic(
    $input: UpdateTeachableTopicInput!
    $condition: ModelTeachableTopicConditionInput
  ) {
    updateTeachableTopic(input: $input, condition: $condition) {
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
export const deleteTeachableTopic = /* GraphQL */ `
  mutation DeleteTeachableTopic(
    $input: DeleteTeachableTopicInput!
    $condition: ModelTeachableTopicConditionInput
  ) {
    deleteTeachableTopic(input: $input, condition: $condition) {
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
export const createTopic = /* GraphQL */ `
  mutation CreateTopic(
    $input: CreateTopicInput!
    $condition: ModelTopicConditionInput
  ) {
    createTopic(input: $input, condition: $condition) {
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
export const updateTopic = /* GraphQL */ `
  mutation UpdateTopic(
    $input: UpdateTopicInput!
    $condition: ModelTopicConditionInput
  ) {
    updateTopic(input: $input, condition: $condition) {
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
export const deleteTopic = /* GraphQL */ `
  mutation DeleteTopic(
    $input: DeleteTopicInput!
    $condition: ModelTopicConditionInput
  ) {
    deleteTopic(input: $input, condition: $condition) {
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
