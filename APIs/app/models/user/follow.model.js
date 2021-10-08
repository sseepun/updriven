const mongoose = require("mongoose");
const MongoPaging = require('mongo-cursor-pagination');
const sanitizerPlugin = require('mongoose-sanitizer-plugin');

const Follow = mongoose.model(
  "Follow",
  new mongoose.Schema({
    user:
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
        },
    follow:
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
        },
  }, { timestamps: true }).plugin(MongoPaging.mongoosePlugin).plugin(sanitizerPlugin)
);

module.exports = Follow;

