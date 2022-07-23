const { Purchase, History, Products } = require('../../../models');

module.exports = {
  async buyProduct(inputData) {
    return await Purchase.create(inputData);
  },
  async historyCreated(data) {
    return await History.create(data);
  }
};
