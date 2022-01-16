const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    events: [Event]
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    events(username: String): [Event]
    event(_id: ID!): Event
  }

  type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
  }

  type Event {
    _id: ID
    eventText: String
    createdAt: String
    username: String
    reactionCount: Int
    reactions: [Reaction]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addEvent(eventText: String!): Event
    addReaction(eventId: ID!, reactionBody: String!): Event
    addFriend(friendId: ID!): User
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
