const buyRepository = require('../../../repositories');

module.exports = {
  async buyProduct(inputData) {
    return await buyRepository.api.v1.buyRepository.buyProduct(inputData);
  },
  async createHistory(data) {
    return await buyRepository.api.v1.buyRepository.historyCreated(data);
  },
  async getPurchase(id) {
    return await buyRepository.api.v1.buyRepository.findAllPurchase(id);
  },
  async deleteSamePurchase(idProduct,idBuyer) {
    return await buyRepository.api.v1.buyRepository.deletePurchase(idProduct,idBuyer);
  },
};
