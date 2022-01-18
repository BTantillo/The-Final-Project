const mongoose = require('mongoose');
const { Schema } = mongoose;
const dateFormat = require('../utils/dateFormat');
const reactionSchema = require('./Reaction');
const userSchema = require('./User');

const eventSchema = new Schema(
  {
    eventText: {
      type: String,
      required: 'You cant leave the event empty!',
      minlength: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    username: {
      type: String,
      required: true,
    },
    // add image stuff when package is figured out
    reactions: [reactionSchema],
    team: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJson: {
      getters: true,
      virtuals: true,
    },
  }
);

eventSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

eventSchema.virtual('crewCount').get(function () {
  return this.team.length;
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
