import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts($username: String!) {
    user(username: $username) {
      username
      name
      tagline
      _id
      publication {
        posts {
          _id
          brief
          coverImage
          slug
          title
          contentMarkdown
          dateAdded
        }
      }
    }
  }
`;

export const GET_OID = gql`
  query GetOID($repo: String!, $branch: String!, $owner: String!) {
    repository(name: $repo, owner: $owner) {
      object(expression: $branch) {
        oid
      }
    }
  }
`;