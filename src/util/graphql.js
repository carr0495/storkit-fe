import { gql } from "@apollo/client";

export const ALL_POSTS = gql`
  query GetPosts {
    getPosts {
      id
      username
      header
      body
      likeCount
      commentCount
      likes {
        username
        createdAt
      }
      comments {
        username
        body
        createdAt
      }
    }
  }
`;

export const RESGISTER_USER = gql`
  mutation Register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        password: $password
        confirmPassword: $confirmPassword
        email: $email
      }
    ) {
      id
      username
      email
      token
      createdAt
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      token
      username
      createdAt
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId) {
      id
    }
  }
`;
export const SET_LIKES = gql`
  mutation SetLikes($postId: ID!) {
    setLikes(postId: $postId) {
      id
    }
  }
`;

export const GET_USER = gql`
  query getUser($userId: ID!) {
    getUser(userId: $userId) {
      username
      email
      createdAt
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($header: String!, $body: String!) {
    createPost(header: $header, body: $body) {
      id
      header
      body
      createdAt
      username
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
    }
  }
`;
