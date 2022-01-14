const { User, Event } = require('../models/');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().select('-__v -password');
    },

    user: async (parent, { username }) => {
      return User.findOne({ username }).select('-__v -password');
    },

    events: async (parent, { username }) => {
      const params = username ? { username }: {};
      return Event.find(params).sort({ createdAt: -1 });
    },

    event: async(parent, { _id }) => {
      return Event.findOne({ _id });
    },
    
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
    
      return user;
    },
    login: async () => {

    }
  }
};

module.exports = resolvers;
