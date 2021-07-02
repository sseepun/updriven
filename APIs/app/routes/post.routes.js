module.exports = app => {
    const router = require("express").Router();
    const { auth,verifySignUp } = require("../middlewares");
    const postController = require("../controllers/post.controller");

    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    router.post("/create", 
        auth.isLoggedIn,
        postController.createPost
    );

    router.post("/delete",
        auth.isLoggedIn,
        postController.deletePost
    );

    router.post("/comment",
        auth.isLoggedIn,
        postController.commentPost
    );
    router.post("/edit_comment",
        auth.isLoggedIn,
        postController.updateComment
    );

    router.post("/sentiment",
        auth.isLoggedIn,
        postController.sentiment
    );

    router.post("/share",
        auth.isLoggedIn,
        postController.sharePost
    )

    app.use('/apis/post', router);
}