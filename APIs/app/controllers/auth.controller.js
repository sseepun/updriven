const db = require("../models");
const jwt = require("jsonwebtoken");
const sanitize = require('mongo-sanitize');
const User = db.user;
const User_detail = db.user_detail;

const bcrypt = require("bcryptjs");

exports.logInStatus = (req, res) => {
    res.status(200).send(req.user);
};

exports.signup = async (req, res) => {
    try {
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            status: false,
        });
    
        const user_detail = new User_detail({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
        });

        await user.save()
        user_detail.username = user._id;
        await user_detail.save()
        user.user_detail = user_detail._id
        await user.save()
        let token = jwt.sign({id: user.id}, "secret", {
            expiresIn: 86400//process.env.VERIFY_EMAIL_TOKENLIFE
        });
        res.status(200).send({token: token});
    }
    catch (err) {
        console.log(err)
        return res.status(500).send({message: err});
    }
}

exports.verifyEmail = async (req, res) => {
    try {
        const decoded = await jwt.verify(req.params.token, "secret")
        req.userId = decoded.id;
        const user = await User.findById(sanitize(req.userId))
        user.status = true;
        await user.save()
        res.status(200).send({ message: "User is activated" });
    }
    catch (err) {
        console.log(err)
        return res.status(500).send(err);
    }
}
