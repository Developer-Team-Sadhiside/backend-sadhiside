const productService = require('../../../services');

module.exports = {
// for seller
  async createProducts(req, res) {
    const {
      nama_produk,
      harga_produk,
      kategori,
      deskripsi,
    } = req.body;
	  await	productService.api.v1.productService.addProduct({
      id_user: req.user.id,
      nama_produk,
      harga_produk,
      gambar: req.image,
      kategori,
      deskripsi,
      status: 'tersedia',
    })
	  .then((createdproduct) => {
        res.status(201).json({
          status: 'Success',
          data: createdproduct,
        });
      }).catch((err) => {
        res.status(400).json({
          status: 'FAIL',
          message: err.message,
        });
      });
  },

  async updateProducts(req, res) {
    const product = await productService.api.v1.productService.findProduct(req.params.id);
    if (!product) {
      res.status(400).json({
        status: 'FAIL',
        message: 'Product not found',
      });
      return
    }
    const {
      nama_produk,
      harga_produk,
      kategori,
      deskripsi,
    } = req.body;
    await productService.api.v1.productService.update(req.params.id, {
      nama_produk,
      harga_produk,
      gambar: req.image,
      kategori,
      deskripsi,
    })
      .then(() => {
        res.status(200).json({
          status: 'OK',
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: 'FAIL',
          message: err.message,
        });
      });
  },

  async deletedProducts(req, res) {
    const product = await productService.api.v1.productService.findProduct(req.params.id);
    if (!product) {
      res.status(400).json({
        status: 'FAIL',
        message: 'Product not found',
      });
      return;
    }
    await productService.api.v1.productService.isDeletedProducts(req.params.id)
      .then(() => {
        res.status(200).json({
          status: 'Success',
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: 'FAIL',
          message: err.message,
        });
      });
  },

  async	listProductsUsers(req, res) {
    await productService.api.v1.productService.getProductsUsers(req.user.id)
      .then(({ data, count }) => {
        res.status(200).json({
          status: 'OK',
          produk: data,
          detail: {
            total: count,
          },
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: 'FAIL',
          message: err.message,
        });
      });
  },

  async	sortingProductsSellerLike(req, res) {
    await productService.api.v1.productService.sortingProducts(req.user.id)
      .then((data) => {
        res.status(200).json({
          status: 'OK',
          produk: data,
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: 'FAIL',
          message: err.message,
        });
      });
  },

  async	listProductsSellerSold(req, res) {
    await productService.api.v1.productService.listProductsSold(req.user.id)
      .then((data) => {
        res.status(200).json({
          status: 'OK',
          produk: data,
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: 'FAIL',
          message: err.message,
        });
      });
  },

  // for buyer
  async	listAllProducts(req, res) {
    await productService.api.v1.productService.listAll()
      .then(({ data, count }) => {
        res.status(200).json({
          status: 'OK',
          produk: data,
          detail: {
            total: count,
          },
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: 'FAIL',
          message: err.message,
        });
      });
  },

  async	listProductByCategories(req, res) {
    await productService.api.v1.productService.getByCategory(req.params.kategori)
      .then(({ data, count }) => {
        res.status(200).json({
          status: 'OK',
          produk: data,
          detail: {
            total: count,
          },
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: 'FAIL',
          message: err.message,
        });
      });
  },

  async	listProductsBuyerLike(req, res) {
    await productService.api.v1.productService.listProductsLike(req.user.id)
      .then((data) => {
        res.status(200).json({
          status: 'OK',
          produk: data,
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: 'FAIL',
          message: err.message,
        });
      });
  },

  // for general
  async	findOneProduct(req, res) {
    const product = await productService.api.v1.productService.findProduct(req.params.id);
    if (!product) {
      res.status(400).json({
        status: 'FAIL',
        message: 'Product not found',
      });
      return
    }
    await productService.api.v1.productService.findProduct(req.params.id)
      .then((data) => {
        res.status(200).json({
          status: 'OK',
          produk: data,
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: 'FAIL',
          message: err.message,
        });
      });
  },
};
