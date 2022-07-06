const { Products } = require("../../../models");

module.exports = {
    async addProduct(inputData) {
        return await Products.create(inputData);
    },
    
    async findAll(args) {
        return await Products.findAll(args);
    },

    async getTotalProduct(args) {
        return await Products.count(args);
    },

    async getTotalProductByCategory(kategori) {
      return await Products.count({
        where : {
          kategori: kategori
        }
      })
    },

    async findByCategory(kategori)  {
      return await Products.findAll({
        where : {
          kategori: kategori
        }
      })
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
}