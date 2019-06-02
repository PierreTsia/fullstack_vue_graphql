import { gql } from "apollo-boost";

/* Posts Queries */
export const GET_POSTS = gql`
  query($limit: Int!) {
    getPosts(limit: $limit) {
      _id
      title
      description
      imageUrl
      likes
      createdBy {
        _id
        avatar
        username
      }
      messages {
        _id
        messageBody
        messageDate
        messageUser {
          _id
          username
          avatar
        }
      }
    }
  }
`;

export const GET_POST_BY_ID = gql`
  query($postId: ID!) {
    getPostById(postId: $postId) {
      _id
      title
      categories
      description
      createdDate
      messages {
        _id
        messageDate
        messageBody
        messageUser {
          _id
          avatar
          username
        }
      }
      imageUrl
      likes
      createdBy {
        _id
        username
      }
    }
  }
`;

export const INFINITE_SCROLL_POSTS = gql`
  query($pageNum: Int!, $pageSize: Int!) {
    infiniteScrollPosts(pageNum: $pageNum, pageSize: $pageSize) {
      posts {
        _id
        title
        imageUrl
        description
        likes
        createdDate
        messages {
          _id
          messageUser {
            _id
            avatar
          }
        }
        createdBy {
          _id
          username
          avatar
        }
      }
      hasMore
    }
  }
`;

export const LIKE_POST = gql`
  mutation($postId: ID!, $userId: ID!) {
    likePost(postId: $postId, userId: $userId) {
      postId
      userIds
    }
  }
`;

/* User Queries */
export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      _id
      username
      email
      avatar
      joinDate
      favorites {
        _id
        title
        imageUrl
      }
    }
  }
`;

/* Posts Mutations */
export const ADD_POST = gql`
  mutation(
    $title: String!
    $imageUrl: String!
    $categories: [String]!
    $description: String!
    $creatorId: ID!
  ) {
    addPost(
      title: $title
      imageUrl: $imageUrl
      categories: $categories
      description: $description
      creatorId: $creatorId
    ) {
      _id
      title
      categories
      description
      imageUrl
      likes
      messages {
        _id
      }
    }
  }
`;

export const ADD_POST_MESSAGE = gql`
  mutation($postId: ID!, $messageBody: String!, $messageUserId: ID!) {
    addPostMessage(
      postId: $postId
      messageBody: $messageBody
      messageUserId: $messageUserId
    ) {
      messageBody
      _id
      messageDate
      messageUser {
        _id
        username
        avatar
      }
    }
  }
`;

/* User Mutations */
export const SIGNIN_USER = gql`
  mutation($username: String!, $password: String!) {
    signinUser(username: $username, password: $password) {
      token
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signupUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;
