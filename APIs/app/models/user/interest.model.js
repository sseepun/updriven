const mongoose = require("mongoose");
const sanitizerPlugin = require('mongoose-sanitizer-plugin');

const Interest = mongoose.model(
  "Interest",
  new mongoose.Schema({
    title : String,
    user_detail:
        [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User_detail"
        }]
    ,
  }, { timestamps: true }).plugin(sanitizerPlugin)
);

module.exports = Interest;

