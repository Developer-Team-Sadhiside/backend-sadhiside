const controllers = require("../app/controllers");
const express = require("express");

const router = express.Router();

// user router
router.post(
    "/v1/users/register",
    controllers.api.v1.authController.authorize,
    controllers.api.v1.userController.postRegister
);
router.post(
    "/v1/users/login", controllers.api.v1.userController.postLogin
);
router.get(
    "/v1/users/current",
    controllers.api.v1.authController.authorize,
    controllers.api.v1.userController.currentUser
);

module.exports = router;

