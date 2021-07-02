const mongoose = require("mongoose");
const MongoPaging = require('mongo-cursor-pagination');
const sanitizerPlugin = require('mongoose-sanitizer-plugin');

const Sentiment = mongoose.model(
    "Sentiment",
    new mongoose.Schema({
        user:
            [{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
            }],
        sentiment: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: 'sentiment_on'
        },
        sentiment_on: {
            type: String,
            required: true,
            enum: ['Post', 'Comment']
        },
        sentiment_type : Number,
        
    }, { timestamps: true }).plugin(MongoPaging.mongoosePlugin).plugin(sanitizerPlugin)

);

module.exports = Sentiment
;
