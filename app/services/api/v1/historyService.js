const historyRepository = require('../../../repositories');

module.exports = {
  async getBidProduct(id) {
    return await historyRepository.api.v1.historyRepository.findBidProductSeller(id);
  },

  async getDetailPurchase(id) {
    return await historyRepository.api.v1.historyRepository.findPurchase(id)
  },

  async getProductsOfferedBuyer(id) {
    return await historyRepository.api.v1.historyRepository.findProductsOfferedBuyer(id);
  },

  async getAcceptedOffer(idSeller,idProduct) {
    return await historyRepository.api.v1.historyRepository.findAcceptedOffer(idSeller,idProduct);
  },

  async updateProductOffer(id,args) {
    return await historyRepository.api.v1.historyRepository.updateOffer(id,args);
  },

  async getAcceptedOfferBuyer(id) {
    return await historyRepository.api.v1.historyRepository.findAcceptedOfferBuyer(id);
  },

  async deletePurchaseReject(id) {
    return await historyRepository.api.v1.historyRepository.deletePurchase(id);
  }
};
