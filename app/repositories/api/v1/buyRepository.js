const {Purchase} = require("../../../models");

module.exports = {
  async buyProduct(inputData) {
    return await Purchase.create(inputData)
  }
}