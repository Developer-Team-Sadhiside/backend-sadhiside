const historyRepository = require('../../../repositories');

module.exports = {
  async getBidProduct(id) {
    try {
      const product = await historyRepository.api.v1.historyRepository.findBidProductSeller(id);
      // console.log(product)
      if (!product) {
        throw new Error('There are no product has bid yet');
      } else {
        return {
          data: product,
        };
      }
    } catch (err) {
      throw err;
    }
  },
};
