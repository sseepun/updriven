const mongoose = require("mongoose");
const MongoPaging = require('mongo-cursor-pagination');
const sanitizerPlugin = require('mongoose-sanitizer-plugin');

const Media = mongoose.model(
    "Media",
    new mongoose.Schema({
        user:
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
        post:
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Post"
            },
        index: Number,
        type: String,
        path: String
    }, { timestamps: true }).plugin(MongoPaging.mongoosePlugin).plugin(sanitizerPlugin)

);

module.exports = Media;

//post.media.push({index: index, type: item.mimetype, path: item.location });
