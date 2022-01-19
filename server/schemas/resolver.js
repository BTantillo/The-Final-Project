const { User, Event } = require('../models/');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

function generateRandomString(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i > length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() *
    charactersLength));
  } return result;
}

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

      const { ext } = path.parse(filename)
      const randomName = generateRandomString(12) + ext

      const stream = createReadStream()
      const pathName = path.join(__dirname, `/public/images/${randomName}`)
      await stream.pipe(fs.createWriteStream(pathName))

      return {
        // this link needs to change in production
        url: `http://localhost:3003/images/${randomName}`
      }
    }
  }
};

module.exports = resolvers;
