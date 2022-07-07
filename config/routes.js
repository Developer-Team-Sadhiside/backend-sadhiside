const controllers = require("../app/controllers");
const express = require("express");
const router = require('express').Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../docs/swagger.json");
const middlewares = require("../app/middlewares");


const appRouter = express.Router();
const apiRouter = express.Router();


// open api document
router.use("/document", swaggerUi.serve);
router.get("/document", swaggerUi.setup(swaggerDocument));

// User router
router.post("/v1/users/register",
  controllers.api.v1.userController.postRegister
);
router.post("/v1/users/login", 
  controllers.api.v1.userController.postLogin
);
router.put("/v1/users/addProfil",
  // uploadOnMemory.single('img'),
  middlewares.uploadOnMemory.any(),
  middlewares.uploader.upload,
  controllers.api.v1.userController.authorize,
  middlewares.ImBuyer.checkUserRole,
  controllers.api.v1.userController.postProfile
);

// Product router
router.post("/api/v1/addProduct",
  middlewares.uploadOnMemory.any(),
  middlewares.uploader.upload,
  controllers.api.v1.userController.authorize,
  middlewares.ImSeller.checkUserRole,
  controllers.api.v1.productController.createProducts
);
router.get("/api/v1/listAllProducts",
  controllers.api.v1.userController.authorize,
  middlewares.ImSeller.checkUserRole,
  controllers.api.v1.productController.listAllProducts
);
router.put("/api/v1/product/:id",
  middlewares.uploadOnMemory.any(),
  middlewares.uploader.upload,
  controllers.api.v1.userController.authorize,
  middlewares.ImSeller.checkUserRole,
  controllers.api.v1.productController.updateProducts
);
router.delete("/api/v1/product/:id",
  controllers.api.v1.userController.authorize,
  middlewares.ImSeller.checkUserRole,
  controllers.api.v1.productController.deletedProducts
);

appRouter.use(apiRouter);

module.exports = router;

