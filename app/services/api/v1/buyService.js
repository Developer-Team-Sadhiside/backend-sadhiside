const buyRepository = require ("../../../repositories")

module.exports = {
  async buyProduct(id,reqBody) {
    return await buyRepository.api.v1.buyRepository.buyProduct(id,reqBody)
  }
}
