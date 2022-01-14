const mongoose = require('mongoose');
const { Schema } = mongoose;
const dateFormat = require('../utils/dateFormat');

const eventSchema = new Schema({
    eventText: {
        type: String,
        required: "You cant leave the event empty!",
        minlength: 1
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp)
    },
    username: {
        type: String,
        required: true
    },
    // reactions: [reactionSchema]
},
{
    toJson: {
        getters: true
    }
  }
);

eventSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;