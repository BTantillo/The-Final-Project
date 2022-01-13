const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    TestString: String
  }
`;

module.exports = typeDefs;