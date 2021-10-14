const passport =require("passport");
const db = require("../models");
const bcrypt = require("bcryptjs");

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;

const User = db.user;
const User_detail = db.user_detail;

require('dotenv').config()

module.exports = passport.serializeUser(function(user, done) {
    done(null, user);
});

module.exports = passport.deserializeUser(function(user, done) {
    done(null, user);
});

module.exports = passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_API_clientID,
        clientSecret: process.env.GOOGLE_API_clientSecret,
        callbackURL: "/apis/auth/google/callback",
    },
    async function(request, accessToken, refreshToken, profile, done) {
        try {
            if (profile.length === 0) {
                return done(null);
            }
            else {
                const user_is_exist = await User.exists({ google_id: profile.id })
                if (user_is_exist) {
                    return done(null, profile.emails[0].value);
                }
                else {
                    const user = await User.findOne({email: profile.emails[0].value})
                    if (user) {
                        user.google_id = profile.id;
                        await user.save()
                    }
                    else {
                        createUser(profile, 'google');
                        return done(null, profile.emails[0].value);
                    }
                }
            }
        }
        catch (err) {
            console.log(err)
        }
    }
));

module.exports = passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        profileFields: ['id', 'emails', 'name', 'location'],
        callbackURL: "/apis/auth/facebook/callback"
    },
    async function(request, accessToken, refreshToken, profile, done) {
        try {
            if (profile.length === 0) {
                return done(null);
            }
            else {
                const user_is_exist = await User.exists({ facebook_id: profile.id })
                if (user_is_exist) {
                    return done(null, profile.emails[0].value);
                }
                else {
                    const user = await User.findOne({email: profile.emails[0].value})
                    if (user) {
                        user.facebook_id = profile.id;
                        await user.save();
                        return done(null, profile.emails[0].value);
                    }
                    else {
                        createUser(profile, 'facebook');
                        return done(null, profile.emails[0].value);
                    }
                }
            }
        }
        catch (err) {
            console.log(err)
        }
    }
));

module.exports = passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ email: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        let passwordIsValid = bcrypt.compareSync(
            password,
            user.password
        );
        if (!passwordIsValid) { return done(null, false); }
        return done(null, user.email);
      });
    }
));

async function createUser(profile, type) {
    try {
        const user = new User({
            email: profile.emails[0].value,
            status: true,
        });
        if (type === 'google') {
            user.google_id = profile.id
        }
        else if (type === 'facebook') {
            user.facebook_id = profile.id
        }    
        const user_detail = new User_detail({
            firstname: profile.name.givenName,
            lastname: profile.name.familyName,
            profile_pic: process.env.DEFAULT_PROFILE_IMAGE,
            background_pic: process.env.DEFAULT_BACKGROUND_IMAGE
        });
        await user.save()
        user_detail.username = user._id;
        await user_detail.save()
        user.user_detail = user_detail._id
        await user.save()
    }
    catch (err) {
        return console.log(err)
    }
 }