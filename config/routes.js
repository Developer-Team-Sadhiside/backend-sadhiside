const controllers = require("../app/controllers");
const express = require("express");
const router = require('express').Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../docs/swagger.json");

const appRouter = express.Router();
const apiRouter = express.Router();


// open api document
router.use("/document", swaggerUi.serve);
router.get("/document", swaggerUi.setup(swaggerDocument));

// user router
router.post(
    "/v1/users/register",
    controllers.api.v1.authController.authorize,
    controllers.api.v1.userController.postRegister
);
router.post(
    "/v1/users/login", controllers.api.v1.userController.postLogin
);

appRouter.use(apiRouter);

module.exports = router;

