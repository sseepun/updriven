module.exports = app => {
    const router = require("express").Router();
    const { auth } = require("../middlewares");
    const adminController = require("../controllers/admin.controller");

    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    router.post("/add_ads",
        [auth.isLoggedIn, auth.isAdmin],
        adminController.addAds
    );

    router.post("/edit_ads",
        [auth.isLoggedIn, auth.isAdmin],
        adminController.editAds
    );

    router.post("/delete_ads",
        [auth.isLoggedIn, auth.isAdmin],
        adminController.deleteAds
    );

    app.use('/apis/admin', router);
}