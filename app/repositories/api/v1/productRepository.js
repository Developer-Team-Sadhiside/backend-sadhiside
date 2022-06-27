const { produk } = require("../../../models");

module.exports = {
    async addProduct(inputData) {
        return await produk.create(inputData);
    },
    
    async findAll(args) {
        return await produk.findAll(args);
    },

    async getTotalProduct(args) {
        return await produk.count(args);
    },

    async updateProducts(id, updateArgs) {
      return await produk.update(updateArgs, {
        where: {
          id,
        },
      });
    },
    
    async isDeletedProducts(id) {
      return await produk.destroy({
        where: {
          id,
        },
      });
    },
}