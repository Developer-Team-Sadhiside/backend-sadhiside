const productService = require('../../../services');

module.exports = {
// for seller
  async createProducts(req, res) {
    try{
      const {
        nama_produk,
        harga_produk,
        kategori,
        deskripsi,
      } = req.body;
      const data = await productService.api.v1.productService.addProduct({
        id_user: req.user.id,
        nama_produk,
        harga_produk,
        gambar: req.image,
        kategori,
        deskripsi,
        status: 'tersedia',
      })
      res.status(201).json({
        status: 'Success',
        data,
      });
    }catch(err){
      res.status(400).json({
        status: 'FAIL',
        message: err.message,
      });
    }
  },

  async updateProducts(req, res) {
    try{
      const product = await productService.api.v1.productService.findProduct(req.params.id);
      if (!product) {
        throw new Error('Product not found')
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
      res.status(200).json({
        status: 'Update product success',
      });
    }catch(err){
      res.status(400).json({
        status: 'FAIL',
        message: err.message,
      });
    }
  },

  async deletedProducts(req, res) {
    try {
      const product = await productService.api.v1.productService.findProduct(req.params.id);
      if (!product) {
        throw new Error('Product not found')
      }
      await productService.api.v1.productService.isDeletedProducts(req.params.id)
      res.status(200).json({
        status: 'Delete product success',
      });
    } catch (err) {
      res.status(400).json({
        status: 'FAIL',
        message: err.message,
      });
    }
  },

  async	listProductsUsers(req, res) {
    try {
      const produk = await productService.api.v1.productService.getProductsUsers(req.user.id)
      res.status(200).json({
        status: 'OK',
        produk: produk.data,
        detail: {
          total: produk.count,
        },
        notif: 'Produk berhasil diterbitkan'
      });
    } catch (err) {
      res.status(400).json({
        status: 'FAIL',
        message: err.message,
      });
    }
  },

  async	sortingProductsSellerLike(req, res) {
    try {
      const produk = await productService.api.v1.productService.sortingProducts(req.user.id)
      res.status(200).json({
        status: 'OK',
        produk,
      });
    } catch (err) {
      res.status(400).json({
        status: 'FAIL',
        message: err.message,
      });
    }
  },

  async	listProductsSellerSold(req, res) {
    try {
      const produk = await productService.api.v1.productService.listProductsSold(req.user.id)
      res.status(200).json({
        status: 'OK',
        produk,
      });
    } catch (err) {
      res.status(400).json({
        status: 'FAIL',
        message: err.message,
      });
    }
  },

  // for buyer
  async	listAllProducts(req, res) {
    try {
      const produk = await productService.api.v1.productService.listAll()
      res.status(200).json({
        status: 'OK',
        produk,
      });
    } catch (err) {
      res.status(400).json({
        status: 'FAIL',
        message: err.message,
      });
    }
  },

  async listAllProductsWithLike(req, res) {
    try {
      const getProducts = await productService.api.v1.productService.listAll()
      const produk = await Promise.all(getProducts.map(async(data) => {
        let isLike = false;
        const isMarked = await productService.api.v1.productService.getOneProductLiked(req.user.id, data.id)
        if(req.user.id && isMarked){
          isLike = true;
        }
        return ({
          id: data.id,
          id_user: data.id_user,
          nama_produk: data.nama_produk,
          harga_produk: data.harga_produk,
          gambar: data.gambar,
          kategori: data.kategori,
          deskripsi: data.deskripsi,
          totalLike: data.totalLike,
          status: data.status,
          updateAt: data.updateAt,
          isLike,
        });
      }));
      res.status(200).json({
        status: 'OK',
        produk
      });
    } catch (err) {
      res.status(400).json({
        status: "FAIL",
        message: err.message
      });
    }
  },

  async	listProductByCategories(req, res) {
    try {
      const produk = await productService.api.v1.productService.getByCategory(req.params.kategori)
      res.status(200).json({
        status: 'OK',
        produk: produk.data,
        detail: {
          total: produk.count,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: 'FAIL',
        message: err.message,
      });
    }
  },

  async	listProductsBuyerLike(req, res) {
    try {
      const produk = await productService.api.v1.productService.listProductsLike(req.user.id)
      res.status(200).json({
        status: 'OK',
        produk,
      });
    } catch (err) {
      res.status(400).json({
        status: 'FAIL',
        message: err.message,
      });
    }
  },

  // for general
  async	findOneProductWhenOffer(req, res) {
    try{
      let ket = ''
      const produk = await productService.api.v1.productService.findProductWhenOffer(req.params.id,req.user.id);
      if (!produk) {
        throw new Error ('Product not found')
      }
      if (produk.status == 'tersedia'){
        ket = 'Saya tertarik dan ingin nego'
      }
      else if (produk.Purchase.id_pembeli == req.user.id && produk.status == 'pending'){
        ket = 'Kamu akan segera dihubungi'
      } 
      else if (produk.status == 'pending'){
        ket = 'Produk sedang ditawar orang lain'
      }
      else if (produk.status == 'terjual'){
        ket = 'Produk sudah terjual !'
      }
      res.status(200).json({
        status: 'OK',
        produk,
        ket,
      });
    }catch(err){
      res.status(400).json({
        status: 'FAIL',
        message: err.message,
      });
    }
  },

  async findOneProduct (req,res) {
    try{
      const produk = await productService.api.v1.productService.findProduct(req.params.id);
      if (!produk) {
        throw new Error ('Product not found')
      }
      res.status(200).json({
        status: 'OK',
        produk,
      });
    }catch(err){
      res.status(400).json({
        status: 'FAIL',
        message: err.message,
      });
    }
  }
};
