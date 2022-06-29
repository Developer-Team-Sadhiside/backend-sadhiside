const likeRepository = require("../../../repositories")

module.exports = {
  async getProduct(id) {
    return await likeRepository.api.v1.likeRepository.findById(id);
  },
  async getUser(id_produk,id_sender){
    return await likeRepository.api.v1.likeRepository.findUser(id_produk,id_sender)
  }
}