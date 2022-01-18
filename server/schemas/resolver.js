const { User, Event } = require('../models/');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

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
      const token = signToken(user);
    
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
    
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
    
      const correctPw = await user.isCorrectPassword(password);
    
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
    
      const token = signToken(user);
      return { token, user };
    },

    uploadFile: async (parent, { file }) => {
      const { createReadStream, filename, mimetype, encoding } = await file

      const stream = createReadStream()
      const pathName = path.join(__dirname, `/public/images/${filename}`)
      await stream.pipe(fs.createWriteStream(pathName))

      return {
        url: `http://localhost:3003/images/${filename}`
      }
    }
    
  }
};

module.exports = resolvers;
