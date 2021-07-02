module.exports = app => {
    const router = require("express").Router();
    const passport = require('../passport/passport.js');
    const { auth,verifySignUp } = require("../middlewares");
    const authController = require("../controllers/auth.controller");

    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    router.post("/signup",
        verifySignUp.checkDuplicateEmail,
        authController.signup
    );

    router.get(
        "/verify/:token",
        authController.verifyEmail
    );

    router.get("/status",
        auth.isLoggedIn,
        authController.logInStatus
    );

    router.post('/login', 
    passport.authenticate('local', { failureRedirect: '/failed' }),
    function(req, res) {
        res.redirect('/apis/auth/status')
    });

    router.get("/failed", (req, res) => {
        res.send("Failed")
    })

    router.get('/google',
        passport.authenticate('google', {
                scope:
                    ['email', 'profile']
            }
        ));

    router.get('/facebook',
        passport.authenticate('facebook', { scope : ['email', 'user_location'] }));

    router.get('/google/callback',
        passport.authenticate('google', {
            failureRedirect: '/failed', }),
        function (req, res) {
            res.redirect('/apis/auth/status')
        }
    );

    router.get('/facebook/callback',
        passport.authenticate('facebook',
            { failureRedirect: '/failed' }),
        function (req, res) {
            res.redirect('/apis/auth/status');
            }
        );

    router.get("/logout", (req, res) => {
        req.session = null;
        req.logout();
        res.status(200).send({message: "Logged out"});
    })

    app.use('/apis/auth', router);
}