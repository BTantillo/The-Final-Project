//const {User} = require('../models');

const resolvers = {
  Query: {test: () => {return 'test Stringed!!'}},
  Mutation: {},
};

module.exports = resolvers;
