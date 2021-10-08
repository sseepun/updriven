const mongoose = require("mongoose");
const sanitizerPlugin = require('mongoose-sanitizer-plugin');

const Organization = mongoose.model(
  "Organization",
  new mongoose.Schema({
    name : String,
    type : String,
  }, { timestamps: true }).plugin(sanitizerPlugin)
);

module.exports = Organization;