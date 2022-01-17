const { User, Event } = require('../models/');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          '-__v -password'
        );

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },

    users: async () => {
      return User.find().select('-__v -password');
    },

    user: async (parent, { username }) => {
      return User.findOne({ username }).select('-__v -password');
    },

    events: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Event.find(params).sort({ createdAt: -1 });
    },

    event: async (parent, { _id }) => {
      return Event.findOne({ _id });
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    addEvent: async (parent, args, context) => {
      if (context.user) {
        const event = await Event.create({
          ...args,
          username: context.user.username,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { events: event._id } },
          { new: true }
        );

        return event;
      }

      throw new AuthenticationError('You need to be logged in to post!');
    },

    addReaction: async (parent, { eventId, reactionBody }, context) => {
      if (context.user) {
        const updatedEvent = await Event.findOneAndUpdate(
          { _id: eventId },
          {
            $push: {
              reactions: { reactionBody, username: context.user.username },
            },
          },
          { new: true, runValidators: true }
        );

        return updatedEvent;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    addFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { friends: friendId } },
          { new: true }
        ).populate('friends');

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    addCrew: async (parent, { crewId }, context) => {
      if (context.user) {
        const updatedEvent = await Event.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { team: crewId } },
          { new: true }
        ).populate('crew');

        return updatedEvent;
      }
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
  },
};

module.exports = resolvers;
