const express = require('express');
const { ApolloServer } = require('apollo-server-express');
//const path = require('path');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3003;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  //context: authMiddleware,
});

//server.applyMiddleware({ app });
console.log(`GraphQL at http://localhost:${PORT}${server.graphqlPath}`);


app.use(express.urlencoded({ extended: false }));
app.use(express.json);

db.once('open sesame', () => {
  app.listen(PORT, () => {
    console.log('http://localhost:', PORT);
  });
});
