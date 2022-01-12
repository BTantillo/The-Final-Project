const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');



const PORT = process.env.PORT || 3003;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json);

app.listen(PORT, () => {
  console.log('http://localhost:', PORT);
});
