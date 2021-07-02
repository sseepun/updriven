module.exports = app => {
    const router = require("express").Router();
    const { auth } = require("../middlewares");
    const feedController = require("../controllers/feed.controller");

    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    router.post("/comment",
        auth.isLoggedIn,
        feedController.getComments
    );

    router.post("/post",
        auth.isLoggedIn,
        feedController.getPosts
    );

    router.post('/sentiment',
        auth.isLoggedIn,
        feedController.getSentiments
    ),

    router.get('/category',
        auth.isLoggedIn,
        feedController.getCategory
    ),

    app.use('/apis/feed', router);
}