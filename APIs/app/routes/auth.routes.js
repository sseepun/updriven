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

    router.get("/success/:token",
        authController.checkLogIn
    );

    router.get(
        "/verify/:token",
        authController.verifyEmail
    );

    router.get("/forgot/:email",
      authController.generateForgotPwdLink
  	);

    router.get("/reset/:token",
      authController.resetPwd
  	);

  	router.post("/reset",
      authController.resetPwd
  	);

    router.get("/status",
        auth.isLoggedIn,
        authController.logInStatus
    );

    router.get("/external_status",
        auth.isLoggedIn,
        authController.logInExternalStatus
    );

    router.post('/login', 
    passport.authenticate('local', { failureRedirect: '/apis/auth/failed' }),
    function(req, res) {
        console.log('asdasdasd')
        res.redirect('/apis/auth/status')
    });

    router.get("/failed", (req, res) => {
        res.status(401).send({message: 'login fail'})
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
            failureRedirect: '/apis/auth/failed', }),
        function (req, res) {
            res.redirect('/apis/auth/external_status')
        }
    );

    router.get('/facebook/callback',
        passport.authenticate('facebook',
            { failureRedirect: '/apis/auth/failed' }),
        function (req, res) {
            res.redirect('/apis/auth/external_status');
            }
        );

    router.get("/logout", (req, res) => {
        req.session = null;
        req.logout();
        res.status(200).send({message: "Logged out"});
    })

    app.use('/apis/auth', router);
}