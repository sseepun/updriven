const db = require("../models");
const User = db.user;
const User_detail = db.user_detail;

isLoggedIn = async (req, res, next) => {
    try {
        if (req.user) {
            const user = await User.findOne({email: req.user}).populate({path:'user_detail', populate: 'organization'})
            req.user = user
            req.userId = user._id;
            return next();
        }
        else {
            return res.status(401).send({message: "Not logged in"});
        }
    }
    catch (err) {
        return res.status(500).send({message: err});
    }
}

const oauth = {
    isLoggedIn
};

module.exports = oauth;