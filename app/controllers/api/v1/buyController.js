const date = require('date-and-time');
const buyService = require('../../../services');
const productService = require('../../../services');

module.exports = {
  async buyProduct(req, res) {
    try {
      let notif = ''
      const product = await productService.api.v1.productService.findProduct(req.params.id);
      if (!product) {
        throw new Error('Product not found');
      }
      if (product.id == req.params.id && product.status == 'tersedia'){
        notif = 'You success offer this product'
      } else if(product.id_user == req.user.id && product.id == req.params.id){
        throw new Error ('You cant buy this product because this is your product')
      } else if(product.id == req.params.id && product.status == 'pending'){
        throw new Error ('You cant buy this product because product status is pending')
      } 
      await productService.api.v1.productService.update(req.params.id, {
        status: 'pending',
      });
      const now = new Date();
      const { harga_tawar } = req.body;
      const purchase = await buyService.api.v1.buyService.buyProduct({
        id_produk: req.params.id,
        id_pembeli: req.user.id,
        harga_tawar,
        tanggal_pembelian: now,
      });
      await buyService.api.v1.buyService.createHistory({
        id_pembelian: purchase.id,
        id_penjual: product.id_user,
        id_pembeli: req.user.id,
      });
      res.status(201).json({
        status: 'Success',
        data: {
          nama_pembeli: req.user.nama,
          harga_tawar,
          tanggal_pembelian: now,
        },
        notif,
      });
    } catch (err) {
      res.status(400).json({
        status: 'FAIL',
        message: err.message,
      });
    }
  },
};
