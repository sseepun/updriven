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

    router.post("/add_organization",
        auth.isLoggedIn,
        userController.addOrganization
    );

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

    app.use('/apis/user', router);
}