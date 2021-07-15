const mongoose = require("mongoose");
const sanitizerPlugin = require('mongoose-sanitizer-plugin');
const Comment = mongoose.model(
    "Comment",
    new mongoose.Schema({
        post_id: String,
        sentiment_count: { type: Number, default: 0 },
        depth: {
            type: Number,
            default: 1
        },
        parent_comment: {
            type: mongoose.Schema.Types.ObjectId,
            default: null
        },
        posted_date: {type: Date, default: Date.now},
        author: {
            id: mongoose.Schema.Types.ObjectId,
            firstname: String,
            lastname: String,
        },
        comment: {
            type: String,
            required: true
        }
    }, {timestamps: true}).plugin(sanitizerPlugin)
);

module.exports = Comment
;
