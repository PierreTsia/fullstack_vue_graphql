import { gql } from "apollo-boost";

/* Posts Queries */
export const GET_POSTS = gql`
  query {
    getPosts {
      _id
      title
      description
      imageUrl
      likes
    }
  }
`;

/* User Queries */

/* Posts Mutations */

/* User Mutations */
