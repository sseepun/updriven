const db = require("../models");
const User = db.user;
const User_detail = db.user_detail;

isLoggedIn = (req, res, next) => {
    if (req.user) {
        User.findOne({email: req.user}).populate({path:'user_detail', populate: 'organization'}).exec((err, user) => {
            if (err) {
                return res.status(500).send({message: err});
            }
            req.user = user
            req.userId = user._id;
            next();
        })
    } else {
        res.status(401).send({message: "Not logged in"});
    }
}

const oauth = {
    isLoggedIn
};

module.exports = oauth;