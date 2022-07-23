const controllers = require('../app/controllers');
const express = require('express');
const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../docs/swagger.json');
const middlewares = require('../app/middlewares');

const appRouter = express.Router();
const apiRouter = express.Router();

// open api document
router.use('/document', swaggerUi.serve);
router.get('/document', swaggerUi.setup(swaggerDocument));

// User router
router.post(
  '/api/v1/users/register',
  controllers.api.v1.userController.postRegister,
);
router.post(
  '/api/v1/users/login',
  controllers.api.v1.userController.postLogin,
);
router.put(
  '/api/v1/users/addProfil',
  // uploadOnMemory.single('img'), you can use this to up 1 image only
  middlewares.uploadOnMemory.any(),
  middlewares.uploader.upload,
  controllers.api.v1.userController.authorize,
  controllers.api.v1.userController.postProfile,
);
router.get(
  '/api/v1/users/whoAmI',
  controllers.api.v1.userController.authorize,
  controllers.api.v1.userController.whoAmI,
);

// Product router
router.get(
  '/api/v1/listAllProducts/Unregister',
  controllers.api.v1.productController.listAllProducts,
);
router.post(
  '/api/v1/addProduct',
  middlewares.uploadOnMemory.any(),
  middlewares.uploader.upload,
  controllers.api.v1.userController.authorize,
  middlewares.checkUser.checkUserRole,
  controllers.api.v1.productController.createProducts,
);
router.get(
  '/api/v1/listAllProducts',
  controllers.api.v1.userController.authorize,
  controllers.api.v1.productController.listAllProducts,
);
router.get(
  '/api/v1/listAllProducts/like',
  controllers.api.v1.userController.authorize,
  controllers.api.v1.productController.listAllProductsWithLike,
);
router.get(
  '/api/v1/getOneProduct/:id',
  controllers.api.v1.userController.authorize,
  controllers.api.v1.productController.findOneProduct,
);
router.get(
  '/api/v1/getOneProductWhenOffer/:id',
  controllers.api.v1.userController.authorize,
  controllers.api.v1.productController.findOneProductWhenOffer,
);
router.get(
  '/api/v1/listProducts/category/:kategori',
  controllers.api.v1.userController.authorize,
  controllers.api.v1.productController.listProductByCategories,
);
router.get(
  '/api/v1/listProducts/seller',
  controllers.api.v1.userController.authorize,
  middlewares.checkUser.checkUserRole,
  controllers.api.v1.productController.listProductsUsers,
);
router.get(
  '/api/v1/listProducts/seller/interested',
  controllers.api.v1.userController.authorize,
  middlewares.checkUser.checkUserRole,
  controllers.api.v1.productController.sortingProductsSellerLike,
);
router.get(
  '/api/v1/listProducts/seller/sold',
  controllers.api.v1.userController.authorize,
  middlewares.checkUser.checkUserRole,
  controllers.api.v1.productController.listProductsSellerSold,
);
router.get(
  '/api/v1/listProducts/buyer/liked',
  controllers.api.v1.userController.authorize,
  controllers.api.v1.productController.listProductsBuyerLike,
);
router.put(
  '/api/v1/product/:id',
  middlewares.uploadOnMemory.any(),
  middlewares.uploader.upload,
  controllers.api.v1.userController.authorize,
  middlewares.checkUser.checkUserRole,
  controllers.api.v1.productController.updateProducts,
);
router.delete(
  '/api/v1/product/:id',
  controllers.api.v1.userController.authorize,
  middlewares.checkUser.checkUserRole,
  controllers.api.v1.productController.deletedProducts,
);
router.post(
  '/api/v1/likes/:id',
  controllers.api.v1.userController.authorize,
  controllers.api.v1.likeController.likeProduct,
);

// Buy router
router.post(
  '/api/v1/buy/product/:id',
  controllers.api.v1.userController.authorize,
  middlewares.checkUser.checkUserRole,
  controllers.api.v1.buyController.buyProduct,
);

// History router
router.get(
  '/api/v1/history/seller',
  controllers.api.v1.userController.authorize,
  middlewares.checkUser.checkUserRole,
  controllers.api.v1.historyController.getProductBid,
);
router.get(
  '/api/v1/history/seller/detailOffer/:id',
  controllers.api.v1.userController.authorize,
  middlewares.checkUser.checkUserRole,
  controllers.api.v1.historyController.getDetailProductBid,
);
router.post(
  '/api/v1/history/seller/acceptOffer/:id',
  controllers.api.v1.userController.authorize,
  middlewares.checkUser.checkUserRole,
  controllers.api.v1.historyController.acceptOffer,
);
router.post(
  '/api/v1/history/seller/rejectOffer/:id',
  controllers.api.v1.userController.authorize,
  middlewares.checkUser.checkUserRole,
  controllers.api.v1.historyController.rejectOffer,
);
router.get(
  '/api/v1/history/buyer/listProductsOffered',
  controllers.api.v1.userController.authorize,
  middlewares.checkUser.checkUserRole,
  controllers.api.v1.historyController.listProductsOfferedBuyer,
);
router.get(
  '/api/v1/history/buyer/listAcceptedOffer',
  controllers.api.v1.userController.authorize,
  middlewares.checkUser.checkUserRole,
  controllers.api.v1.historyController.ListAcceptedOffer,
);


appRouter.use(apiRouter);

module.exports = router;
