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
      categories {
        _id
        label
        color
      }
      description
      content
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

export const SEARCH_POSTS = gql`
  query($searchTerm: String) {
    searchPosts(searchTerm: $searchTerm) {
      _id
      title
      description
      imageUrl
      likes
    }
  }
`;

export const GET_FAVORITE_POSTS = gql`
  query($userId: ID!) {
    getFavoritePosts(userId: $userId) {
      _id
      title
      createdBy {
        _id
        username
        avatar
      }
      categories {
        _id
        label
      }
      likes
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

export const UNLIKE_POST = gql`
  mutation($postId: ID!, $userId: ID!) {
    unlikePost(postId: $postId, userId: $userId) {
      postId
      userIds
    }
  }
`;

/* Tags Queries*/

export const GET_TAGS = gql`
  query {
    getTags {
      _id
      label
      color
    }
  }
`;

/* User Queries */
export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      _id
      username
      avatar
      email
      joinDate
      profile {
        _id
        bio
        bannerUrl
        DateOfBirth
        country {
          name
          code
        }
        gender
        friends {
          _id
          username
          avatar
        }
        subscriptions {
          _id
          label
          color
        }
        social {
          youtube
          linkedin
          twitch
          twitter
          instagram
          github
        }
      }
    }
  }
`;

/* Posts Mutations */
export const ADD_POST = gql`
  mutation($post: PostInput!) {
    addPost(post: $post) {
      _id
      title
      createdBy {
        _id
      }
      categories {
        _id
        label
        color
      }
      description
      content
      imageUrl
      likes
      messages {
        _id
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation($postId: ID!) {
    deletePost(postId: $postId)
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

/* Profiles Queries */

export const PROFILE_BY_USER_ID = gql`
  query($userId: ID!) {
    profileByUserId(userId: $userId) {
      _id
      bio
      social {
        youtube
        linkedin
      }
      user {
        _id
        username
      }
    }
  }
`;

export const PROFILE_BY_ID = gql`
  query($profileId: ID!) {
    profileById(profileId: $profileId) {
      _id
      user {
        _id
        username
      }
      bio
      social {
        youtube
      }
      subscriptions {
        _id
      }
    }
  }
`;

/* Profiles mutations */

export const ADD_PROFILE = gql`
  mutation($profile: ProfileInput!) {
    addProfile(profile: $profile) {
      _id
      user {
        _id
        username
      }
      subscriptions {
        _id
        label
      }
      friends {
        _id
        username
      }
      bio
      DateOfBirth
      gender
      social {
        linkedin
        youtube
      }
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation($profile: ProfileInput) {
    updateProfile(profile: $profile) {
      _id
      gender
      user {
        _id
        username
      }
      country {
        name
      }
      bio
      social {
        youtube
        linkedin
        twitch
      }
    }
  }
`;
