const mongoose = require("mongoose");
const sanitizerPlugin = require('mongoose-sanitizer-plugin');
const Share = mongoose.model(
    "Share",
    new mongoose.Schema({
        user:
            [{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
            }]
        ,
        post:
            [{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Post"
            }]
        ,
        sentiment_count: { type: Number, default: 0 },
    }, { timestamps: true }).plugin(sanitizerPlugin)

);

module.exports = Share
;
