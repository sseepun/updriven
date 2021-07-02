const mongoose = require("mongoose");
const sanitizerPlugin = require('mongoose-sanitizer-plugin');

const Category = mongoose.model(
    "Category",
    new mongoose.Schema({
        category_name : String,
        keyword : [],
        is_featured : Boolean,
        status : Boolean,
    }, { timestamps: true }).plugin(sanitizerPlugin)

);

module.exports = Category
;
