const historyService = require('../../../services');
const productService = require('../../../services');

module.exports = {
//for seller
  async getProductBid(req, res) {
    try{
      const data = await historyService.api.v1.historyService.getBidProduct(req.user.id)
      res.status(200).json({
        status: 'OK',
        data,
        title: 'Tawaran untuk produkmu'
      });
    }catch(err){
      res.status(400).json({
        status: 'FAIL',
        message: err.message,
      });
    }
  },

  async getDetailProductBid(req, res) {
    try{
      const purchase = await historyService.api.v1.historyService.getDetailPurchase(req.params.id)
      if(!purchase){
        throw new Error ('Purchase not found')
      }
      const data = await historyService.api.v1.historyService.getDetailPurchase(req.params.id)
      res.status(200).json({
        status: 'OK',
        data,
      });
    }catch(err){
      res.status(400).json({
        status: 'FAIL',
        message: err.message,
      });
    }
  },

  async acceptOffer(req,res){
    try{
      await historyService.api.v1.historyService.updateProductOffer(req.params.id,{
        status: 'terjual'
      })
      const data = await historyService.api.v1.historyService.getAcceptedOffer(req.user.id,req.params.id)
      res.status(200).json({
        status: 'OK',
        data,
      });
    }catch(err){
      res.status(400).json({
        status: 'FAIL',
        message: err.message,
      });
    }
  },

  async rejectOffer(req,res){
    try{
      await productService.api.v1.productService.update(req.params.id, {
        status: 'tersedia',
      })
      await historyService.api.v1.historyService.deletePurchaseReject(req.params.id)
      res.status(200).json({
        status: 'OK',
        message: 'Purchase has been deleted'
      });
    }catch(err){
      res.status(400).json({
        status: 'FAIL',
        message: err.message,
      });
    }
  },

//for buyer
  async listProductsOfferedBuyer(req,res) {
    try{
      const data = await historyService.api.v1.historyService.getProductsOfferedBuyer(req.user.id)
      res.status(200).json({
        status: 'OK',
        data,
        title: 'Penawaran Produk'
      });
    }catch(err){
      res.status(400).json({
        status: 'FAIL',
        message: err.message,
      });
    }
  },

  async ListAcceptedOffer(req,res) {
  try{
    const data = await historyService.api.v1.historyService.getAcceptedOfferBuyer(req.user.id)
    res.status(200).json({
      status: 'OK',
      data,
      notif: 'Kamu akan segera dihubungi penjual via Whatsapp',
      title: 'Penawaran produk'
    });
  }catch(err){
    res.status(400).json({
      status: 'FAIL',
      message: err.message,
    });
  }
  }
};
