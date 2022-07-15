const { Purchase, History, Products } = require('../../../models');

module.exports = {
  async buyProduct(inputData) {
    return await Purchase.create(inputData);
  },
  async historyCreated(data) {
    return await History.create(data);
  },
  async findAllPurchase(id) {
    return await Purchase.findOne({
      where:{
        id_produk:id
      },
      include: {
        model: Products,
        where: {
          status: "pending"
        }
      }
    })
  },
  async deletePurchase(idProduct,idBuyer) {
    return await Purchase.destroy({
      where: {
        id_produk: idProduct,
        id_pembeli: idBuyer
      }
    })
  }
};
