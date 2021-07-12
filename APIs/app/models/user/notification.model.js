const mongoose = require("mongoose");
const sanitizerPlugin = require('mongoose-sanitizer-plugin');

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    email: String,
    password: String,
    profile_image : String,
    facebook_id : String,
    google_id : String,
    status: Boolean,
    role:
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }]
      ,
    user_detail:
        [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User_detail"
        }]
    ,
  }, { timestamps: true }).plugin(sanitizerPlugin)
);

module.exports = User;