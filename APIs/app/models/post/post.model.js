const mongoose = require("mongoose");
const MongoPaging = require('mongo-cursor-pagination');
const sanitizerPlugin = require('mongoose-sanitizer-plugin');

const Post = mongoose.model(
    "Post",
    new mongoose.Schema({
        
        user:
            [{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
            }],
        category:
            [{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Category"
            }], 
        subject:  String,
        content:  String,
        media: Array,
        sentiment_count: { type: Number, default: 0 },
        comment_count: { type: Number, default: 0 },
        visible_to: { type: Number },
        status:  Boolean,
        share: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Share"
    }],
    }, { timestamps: true }).plugin(MongoPaging.mongoosePlugin).plugin(sanitizerPlugin)

);

module.exports = Post;
