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

    router.post('/image_list',
        auth.isLoggedIn,
        userController.imageList
    );

    router.post('/follow',
        auth.isLoggedIn,
        userController.follow
    );

    router.post('/unfollow',
        auth.isLoggedIn,
        userController.unfollow
    );

    router.post('/following_list',
        auth.isLoggedIn,
        userController.following_list
    );

    router.post('/edit_profile_image',
        auth.isLoggedIn,
        userController.updateProfileImage
    );

    router.post('/edit_background_image',
        auth.isLoggedIn,
        userController.updateBackground
    )

    router.get('/notification',
        auth.isLoggedIn,
        userController.getNotification
    );

    router.post('/clear_notification',
        auth.isLoggedIn,
        userController.deleteNotification
    );

    router.get('/profile/:userID',
        auth.isLoggedIn,
        userController.viewOtherUserInfo
    );

    app.use('/apis/user', router);
}