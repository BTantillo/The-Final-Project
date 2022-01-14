const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    events(username: String): [Event]
    event(_id: ID!): Event
  }

  type Query {
    users: [User]
    user(username: String!): User
    events(username: String): [Event]
    event(_id: ID!): Event
  }

  type Event {
    _id: ID
    eventText: String
    createdAt: String
    username: String
  }
`;

module.exports = typeDefs;
