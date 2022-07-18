const historyService = require('../../../services');
const productService = require('../../../services');

module.exports = {
//for seller
  async getProductBid(req, res) {
    await historyService.api.v1.historyService.getBidProduct(req.user.id)
    .then((data) => {
      res.status(200).json({
        status: 'OK',
        data: data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: 'FAIL',
        message: err.message,
      });
    });
  },

  async getDetailProductBid(req, res) {
    const purchase = await historyService.api.v1.historyService.getDetailPurchase(req.params.id)
    if(!purchase){
      res.status(400).json({
        status: 'FAIL',
        message: 'Purchase not found',
      });
      return
    }
    await historyService.api.v1.historyService.getDetailPurchase(req.params.id)
    .then((data) => {
      res.status(200).json({
        status: 'OK',
        data: data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: 'FAIL',
        message: err.message,
      });
    });
  },

  async acceptOffer(req,res){
    await historyService.api.v1.historyService.updateProductOffer(req.params.id,{
      status: 'terjual'
    })
    await historyService.api.v1.historyService.getAcceptedOffer(req.user.id,req.params.id)
    .then((data) => {
      res.status(200).json({
        status: 'OK',
        data: data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: 'FAIL',
        message: err.message,
      });
    });
  },

  async rejectOffer(req,res){
    await productService.api.v1.productService.update(req.params.id, {
      status: 'tersedia',
    })
    await historyService.api.v1.historyService.deletePurchaseReject(req.params.id)
    .then(() => {
      res.status(200).json({
        status: 'OK',
        message: 'Purchase has been deleted'
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: 'FAIL',
        message: err.message,
      });
    });
  },

//for buyer
  async listProductsOfferedBuyer(req,res) {
    await historyService.api.v1.historyService.getProductsOfferedBuyer(req.user.id)
    .then((data) => {
      res.status(200).json({
        status: 'OK',
        data: data
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: 'FAIL',
        message: err.message,
      });
    });
  },

  async ListAcceptedOffer(req,res) {
    await historyService.api.v1.historyService.getAcceptedOfferBuyer(req.user.id)
    .then((data) => {
      res.status(200).json({
        status: 'OK',
        data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: 'FAIL',
        message: err.message,
      });
    });
  }
};
