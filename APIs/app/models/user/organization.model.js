const mongoose = require("mongoose");
const sanitizerPlugin = require('mongoose-sanitizer-plugin');

const Organization = mongoose.model(
  "Organization",
  new mongoose.Schema({
    name : String ,
    type : String ,
    start_year : String ,
    end_year : String ,
    user_detail:
        [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User_detail"
        }]
    ,
  }, { timestamps: true }).plugin(sanitizerPlugin)
);

module.exports = Organization;