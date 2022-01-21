import { gql } from '@apollo/client';

export const QUERY_EVENTS = gql`
  query events($username: String) {
    events(username: $username) {
      _id
      eventText
      createdAt
      username
      reactionCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;

export const QUERY_EVENT = gql`
  query event($id: ID!) {
    event(_id: $id) {
      _id
      eventText
      createdAt
      username
      reactionCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      events {
        _id
        eventText
        createdAt
        reactionCount
      }
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      events {
        _id
        eventText
        createdAt
        reactionCount
        reactions {
          _id
          createdAt
          reactionBody
          username
        }
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
      events {
        _id
        eventText
        createdAt
        reactionCount
      }
    }
  }
`;
