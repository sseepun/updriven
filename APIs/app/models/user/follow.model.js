const mongoose = require("mongoose");
const sanitizerPlugin = require('mongoose-sanitizer-plugin');

const Follow = mongoose.model(
  "Follow",
  new mongoose.Schema({
    title : String,
    friend:
        [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
        }],
    follower:
        [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
        }],
    followed:
        [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
        }],
    user:
        [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
        }],
  }, { timestamps: true }).plugin(sanitizerPlugin)
);

module.exports = Follow;

