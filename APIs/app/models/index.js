const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.log = require("./log/log.model");
db.category = require("./post/category.model");
db.comment = require("./post/comment.model");
db.sentiment = require("./post/sentiment.model");
db.post = require("./post/post.model");
db.share = require('./post/share.model');
db.follow = require('./user/follow.model');
db.interest = require('./user/interest.model');
db.organization = require('./user/organization.model');
db.role = require('./user/role.model');
db.user_detail = require("./user/user_detail.model");
db.user = require("./user/user.model");
db.notification = require("./user/notification.model");
db.media = require("./post/media.model")

module.exports = db;