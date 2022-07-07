const buyRepository = require ("../../../repositories")

module.exports = {
  async buyProduct(reqBody) {
    return await buyRepository.api.v1.buyRepository.buyProduct(reqBody)
  }
}
