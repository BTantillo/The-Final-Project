//const {User} = require('../models');

const resolvers = {
  Query: {
    TestString: () => {
      return 'test Stringed!!';
    },
  },
};

module.exports = resolvers;
