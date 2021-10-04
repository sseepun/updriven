const mongoose = require("mongoose");
const sanitizerPlugin = require('mongoose-sanitizer-plugin');

const Role = mongoose.model(
  "Role",
  new mongoose.Schema({
    is_mentor : Boolean,
    is_admin : Boolean,
    is_learner : Boolean,
    is_corporate : Boolean,

  }).plugin(sanitizerPlugin)
);

module.exports = Role;
