const {Purchase} = require("../../../models");
const {Products} = require("../../../models");

module.exports = {
  async buyProduct(inputData) {
    await Purchase.create(inputData)
  },
}