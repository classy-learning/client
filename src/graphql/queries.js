/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTeacherAccount = /* GraphQL */ `
  query GetTeacherAccount($id: ID!) {
    getTeacherAccount(id: $id) {
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
export const listTeacherAccounts = /* GraphQL */ `
  query ListTeacherAccounts(
    $filter: ModelTeacherAccountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTeacherAccounts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const resourceTopicByResourceId = /* GraphQL */ `
  query ResourceTopicByResourceId(
    $resourceId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelResourceTopicFilterInput
    $limit: Int
    $nextToken: String
  ) {
    resourceTopicByResourceId(
      resourceId: $resourceId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        }
        topic {
          id
          name
          description
          createdAt
          updatedAt
          version
        }
      }
      nextToken
    }
  }
`;
export const resourceTopicByTopicId = /* GraphQL */ `
  query ResourceTopicByTopicId(
    $topicId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelResourceTopicFilterInput
    $limit: Int
    $nextToken: String
  ) {
    resourceTopicByTopicId(
      topicId: $topicId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        }
        topic {
          id
          name
          description
          createdAt
          updatedAt
          version
        }
      }
      nextToken
    }
  }
`;
export const teachableTopicByTeacherAccountId = /* GraphQL */ `
  query TeachableTopicByTeacherAccountId(
    $teacherAccountId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelTeachableTopicFilterInput
    $limit: Int
    $nextToken: String
  ) {
    teachableTopicByTeacherAccountId(
      teacherAccountId: $teacherAccountId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        teacherAccountId
        teacherAccount {
          id
          teacherUsername
          createdAt
          updatedAt
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
        }
      }
      nextToken
    }
  }
`;
export const teachableTopicTopicByTopicId = /* GraphQL */ `
  query TeachableTopicTopicByTopicId(
    $topicId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelTeachableTopicFilterInput
    $limit: Int
    $nextToken: String
  ) {
    teachableTopicTopicByTopicId(
      topicId: $topicId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        teacherAccountId
        teacherAccount {
          id
          teacherUsername
          createdAt
          updatedAt
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
        }
      }
      nextToken
    }
  }
`;
export const getCustomerAccount = /* GraphQL */ `
  query GetCustomerAccount($id: ID!) {
    getCustomerAccount(id: $id) {
      id
      customerUsername
      stripeCustomerId
      createdAt
      updatedAt
    }
  }
`;
export const listCustomerAccounts = /* GraphQL */ `
  query ListCustomerAccounts(
    $filter: ModelCustomerAccountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCustomerAccounts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        customerUsername
        stripeCustomerId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const customerAccountsByCustomerUsername = /* GraphQL */ `
  query CustomerAccountsByCustomerUsername(
    $customerUsername: ID
    $sortDirection: ModelSortDirection
    $filter: ModelCustomerAccountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    customerAccountsByCustomerUsername(
      customerUsername: $customerUsername
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        customerUsername
        stripeCustomerId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listResources = /* GraphQL */ `
  query ListResources(
    $filter: ModelResourceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listResources(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getResource = /* GraphQL */ `
  query GetResource($id: ID!) {
    getResource(id: $id) {
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
export const searchResources = /* GraphQL */ `
  query SearchResources(
    $filter: SearchableResourceFilterInput
    $sort: SearchableResourceSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchResources(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      total
    }
  }
`;
export const getStudentAccount = /* GraphQL */ `
  query GetStudentAccount($id: ID!) {
    getStudentAccount(id: $id) {
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
export const listStudentAccounts = /* GraphQL */ `
  query ListStudentAccounts(
    $filter: ModelStudentAccountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStudentAccounts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        updatedAt
        customerUsername
        customerUser {
          Username
          UserCreateDate
          UserLastModifiedDate
          Enabled
          UserStatus
          PreferredMfaSetting
          UserMFASettingList
        }
        studentUsername
        studentUser {
          Username
          UserCreateDate
          UserLastModifiedDate
          Enabled
          UserStatus
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
          status
        }
      }
      nextToken
    }
  }
`;
export const studentAccountsByCustomerUsername = /* GraphQL */ `
  query StudentAccountsByCustomerUsername(
    $customerUsername: ID
    $sortDirection: ModelSortDirection
    $filter: ModelStudentAccountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    studentAccountsByCustomerUsername(
      customerUsername: $customerUsername
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        updatedAt
        customerUsername
        customerUser {
          Username
          UserCreateDate
          UserLastModifiedDate
          Enabled
          UserStatus
          PreferredMfaSetting
          UserMFASettingList
        }
        studentUsername
        studentUser {
          Username
          UserCreateDate
          UserLastModifiedDate
          Enabled
          UserStatus
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
          status
        }
      }
      nextToken
    }
  }
`;
export const listTopics = /* GraphQL */ `
  query ListTopics(
    $filter: ModelTopicFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTopics(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getTopic = /* GraphQL */ `
  query GetTopic($id: ID!) {
    getTopic(id: $id) {
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
export const searchTopics = /* GraphQL */ `
  query SearchTopics(
    $filter: SearchableTopicFilterInput
    $sort: SearchableTopicSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchTopics(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      total
    }
  }
`;
