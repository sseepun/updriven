const db = require("../models");
const jwt = require("jsonwebtoken");
const sanitize = require('mongo-sanitize');
const handlebars = require('handlebars');
const path = require('path');
const fs = require("fs");
const User = db.user;
const User_detail = db.user_detail;
const bcrypt = require("bcryptjs");
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

exports.logInStatus = (req, res) => {
    res.status(200).send(req.user);
};

exports.logInExternalStatus = (req, res) => {
    let token = jwt.sign({id: req.user.id}, process.env.LOGIN_SUCCESS_SECRET, {
        expiresIn: 10000
    });
    res.redirect(process.env.CLIENT_URL + '/auth/success/' + token)
};

exports.checkLogIn = async (req, res) => {
    try {
        const decoded = await jwt.verify(req.params.token, process.env.LOGIN_SUCCESS_SECRET)
        const user = await User.findById(decoded.id).populate({path:'user_detail', populate: 'organization'})
        res.status(200).send(user);
    }
    catch (err) {
        console.log(err)
        return res.status(500).send({message: err});
    }
}

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
        let token = jwt.sign({id: user.id}, process.env.VERIFY_EMAIL_SECRET, {
            expiresIn: process.env.VERIFY_EMAIL_TOKEN_LIFE
        });

        // create email with verify link : /auth/verifyRegister/:token
        const email_html = fs.readFileSync(path.join(__dirname, '../assets/fromEmail/register/index.html'), 'utf8')
        let template =  handlebars.compile(email_html)
        let replacements = { verifyLink: process.env.EMAIL_DOMAIN + 'auth/verify-token-register/' + token };
        let complete_html = template(replacements);
        const msg = {
            to: user.email,
            from: process.env.EMAIL_FROM,
            subject: "Email verification at UpDriven",
            html: complete_html
          }
        const response = await sgMail.send(msg)

        res.status(200).send({token: token});
    }
    catch (err) {
        console.log(err)
        return res.status(500).send({message: err});
    }
}

exports.verifyEmail = async (req, res) => {
    try {
        const decoded = await jwt.verify(req.params.token, process.env.VERIFY_EMAIL_SECRET)
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

exports.generateForgotPwdLink = async (req, res) => {
    try {
        const user = await User.findOne({ email: sanitize(req.params.email) })
        if (!user) {
            return res.status(200).send({ message: "If a matching account was found, an email was sent to " + req.params.email + " to allow you to reset your password" });
        }
        let token = jwt.sign({id: user.id}, process.env.RESET_PASSWORD_SECRET, {
            expiresIn: process.env.RESET_PASSWORD_TOKEN_LIFE
        });
        const email_html = fs.readFileSync(path.join(__dirname, '../assets/fromEmail/register/index.html'), 'utf8')
        let template =  handlebars.compile(email_html)
        let replacements = { verifyLink: process.env.EMAIL_DOMAIN + 'auth/check-forget-password/' + token };
        let complete_html = template(replacements);
        const msg = {
            to: user.email,
            from: process.env.EMAIL_FROM,
            subject: "Reset password link at UpDriven",
            html: complete_html
        }
        const response = await sgMail.send(msg)
				res.status(200).send({ message: "If a matching account was found an email was sent to " + req.params.email + " to allow you to reset your password" });
        //res.status(200).send({ verifyLink: token });
    }
    catch (err) {
        return res.status(500).send({message: err});
    }
};

exports.resetPwd = (req, res) => {
	console.log(req.body);
    if (req.params.token) {
        jwt.verify(req.params.token, process.env.RESET_PASSWORD_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).send({message: "Token expired"});
            }
            req.userId = decoded.id;
            res.status(200).send({ UserId: req.userId });
        });
    }
    else if (req.body.token) {
        jwt.verify(req.body.token, process.env.RESET_PASSWORD_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).send({message: "Token expired"});
            }
            req.userId = decoded.id;
        });

        User.findById(sanitize(req.userId)).exec((err, user_callback) => {
            if (err) {
                return res.status(500).send({message: err});
            }
            user_callback.updateOne( { password: bcrypt.hashSync(req.body.password, 8) },
                [],
                function (err){
                    if (err) {
                        return res.status(500).send({message: err});
                    }
                    res.status(200).send({message: "password เปลี่ยนแล้ว นะจ๊ะ นะจ๊ะ"})
                });
        });
    }
    else {
        return res.status(401).send({message: "Token expired"})
    }
};

