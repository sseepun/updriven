const mongoose = require("mongoose");
const sanitizerPlugin = require('mongoose-sanitizer-plugin');

const Notification = mongoose.model(
  "Notification",
  new mongoose.Schema({
      action_to: {
          type: mongoose.Schema.Types.ObjectId,
          refPath: 'action_on'
      },
      action_on: {
        type: String,
        required: true,
        enum: ['Post', 'Comment']
    },
      action_by: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
      }
  }, { timestamps: true }).plugin(sanitizerPlugin)
);

module.exports = Notification;