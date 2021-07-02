const mongoose = require("mongoose");
const sanitizerPlugin = require('mongoose-sanitizer-plugin');

const User_detail = mongoose.model(
    "User_detail",
    new mongoose.Schema({
        username:
            [{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
            }]
        ,
        prefix: { type:String, default: '-'},
        firstname: { type:String, default: '-'},
        lastname: { type:String, default: '-'},
        phone: { type:String, default: '-'},
        address: { type:String, default: '-'},
        province: { type:String, default: '-'},
        gender : { type:String, default: '-'},
        state_id : { type:String, default: '-'},
        country_id : { type:String, default: '-'},
        organization:
            [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization"
            }]
    ,

    }, { timestamps: true }).plugin(sanitizerPlugin)

);

module.exports = User_detail;