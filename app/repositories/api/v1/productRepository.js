const { Products, Users, Like, Purchase } = require("../../../models");

module.exports = {
  async addProduct(inputData) {
    return await Products.create(inputData);
  },

  async findAll(args) {
    return await Products.findAll({
      order: [["id", "ASC"]],
    },args);
  },

  async getProduct(id) {
    return await Products.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: Users,
          attributes: {
            exclude: ["password"],
          },
        },
        {
          model: Purchase,
        },
        {
          model: Like,
        }
      ],
    });
  },

  async getProductWhenOffer(idProduct,idBuyer) {
    return await Products.findOne({
      include: [
        {
          model: Users,
          attributes: {
            exclude: ["password"],
          },
        },
        {
          model: Purchase,
        },
        {
          model: Like,
          where:{
            id_pembeli: idBuyer,
            id_produk: idProduct,
          }
        }
      ],
    });
  },

  async getTotalProductByCategory(kategori) {
    return await Products.count({
      where: {
        kategori,
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
        kategori,
      },
    });
  },

  async findProductsUsers(id) {
    return await Products.findAll({
      order: [["id", "DESC"]],
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
      include: {
        model: Like,
        where: {
          isLike: true,
        },
      },
      order: [["totalLike", "DESC"]],
    });
  },

  async findProductsSold(id) {
    return await Products.findAll({
      where: {
        id_user: id,
        status: "terjual",
      },
    });
  },

  async findProductsLike(id) {
    return await Products.findAll({
      include: {
        model: Like,
        where: {
          id_pembeli: id,
          isLike: true,
        },
      },
    });
  },

  async findOneProductLiked(idBuyer, idProduct) {
    return await Products.findOne({
      include: {
        model: Like,
        where: {
          id_pembeli: idBuyer,
          id_produk: idProduct,
          isLike: true,
        },
      },
    });
  },

  async updateProducts(id, reqBody) {
    return await Products.update(reqBody, {
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
