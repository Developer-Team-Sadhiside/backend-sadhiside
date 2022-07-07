const { Products } = require("../../../models");

module.exports = {
  async addProduct(inputData) {
    return await Products.create(inputData);
  },

  async findAll(args) {
    return await Products.findAll(args);
  },

  async getProduct(id) {
    return await Products.findOne({
      where: {
        id: id,
      },
    });
  },

  async getTotalProduct(args) {
    return await Products.count(args);
  },

  async getTotalProductByCategory(kategori) {
    return await Products.count({
      where: {
        kategori: kategori,
      },
    });
  },

  async getTotalProductsUsers(id) {
    return await Products.count({
      where: {
        id_user: id,
      },
    });
  },

  async findByCategory(kategori) {
    return await Products.findAll({
      where: {
        kategori: kategori,
      },
    });
  },

  async findProductsUsers(id) {
    return await Products.findAll({
      where: {
        id_user: id,
      },
    });
  },

  async findProducts(id) {
    return await Products.findAll({
      where: {
        id_user: id,
      },
      order: [
        ["totalLike","DESC"]
      ],
    });
  },

  async findProductsSold(id) {
    return await Products.findAll({
      where: {
        id_user: id,
        status: "terjual"
      },
    });
  },

  async updateProducts(id, updateArgs) {
    return await Products.update(updateArgs, {
      where: {
        id,
      },
    });
  },

  async isDeletedProducts(id) {
    return await Products.destroy({
      where: {
        id,
      },
    });
  },
};
