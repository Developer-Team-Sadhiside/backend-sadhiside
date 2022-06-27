const controllers = require("../app/controllers");
const express = require("express");
const router = require('express').Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../docs/swagger.json");
const upload = require("../app/middlewares/uploader");
const uploadimg = require("../app/middlewares/upload");
const uploadOnMemory = require("../app/middlewares/uploudOnMemory");
const cloudinary = require("../library/cloudinary");


const appRouter = express.Router();
const apiRouter = express.Router();


// open api document
router.use("/document", swaggerUi.serve);
router.get("/document", swaggerUi.setup(swaggerDocument));

// user router
router.post(
    "/v1/users/register",
    controllers.api.v1.userController.postRegister
);
router.post(
    "/v1/users/login", controllers.api.v1.userController.postLogin
);
router.put(
    "/v1/users/addProfil/:id",
    upload.single("photo"),
    controllers.api.v1.userController.authorize,
    controllers.api.v1.userController.postProfile
);

//Product router
router.post("/api/v1/addProduct",
    upload.single("img1"),
    controllers.api.v1.userController.authorize,
    controllers.api.v1.productController.createProducts
);
router.get("/api/v1/listAllProducts/:id",
    controllers.api.v1.userController.authorize,
    controllers.api.v1.productController.listAllProducts
);
router.put("/api/v1/product/:id",
    // controllers.api.v1.userController.authorize,
    controllers.api.v1.productController.updateProducts
);

router.delete("/api/v1/product/:id",
    controllers.api.v1.userController.authorize,
    controllers.api.v1.productController.deletedProducts
);


//testing upload image
router.put(
    "/api/v1/profiles/:id/picture",
    uploadimg.single("picture"),
    (req, res) => {
      const url = `/uploads/${req.file.filename}`;
      res
        .status(200)
        .json({ message: "Foto berhasil di-upload, silahkan cek URL", url });
    }
  );
  
router.put(
    "/api/v1/profiles/:id/img/cloudinary",
    uploadOnMemory.single("picture"),
    controllers.api.v1.imageController.uploadImage,
    controllers.api.v1.productController.updateProducts
  );
  



appRouter.use(apiRouter);



module.exports = router;

