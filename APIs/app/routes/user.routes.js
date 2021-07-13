module.exports = app => {
    const router = require("express").Router();
    const { auth } = require("../middlewares");
    const userController = require("../controllers/user.controller");

    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    router.post('/post',
        auth.isLoggedIn,
        userController.posts
    );

    router.post('/edit_info',
        auth.isLoggedIn,
        userController.editInfo
    );

    router.get('/notification',
        auth.isLoggedIn,
        userController.getNotification
    );

    router.post('/clear_notification',
        auth.isLoggedIn,
        userController.deleteNotification
    );

    app.use('/apis/user', router);
}