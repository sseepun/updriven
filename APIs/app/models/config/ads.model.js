const mongoose = require("mongoose");
const sanitizerPlugin = require('mongoose-sanitizer-plugin');

const Ads = mongoose.model(
    "Ads",
    new mongoose.Schema({
        title: String,
        path: String,
        link: String
    }).plugin(sanitizerPlugin)
);

module.exports = Ads;
