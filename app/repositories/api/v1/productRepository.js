const { produk } = require("../../../models");

module.exports = {
    addProduct(inputData) {
        return produk.create(inputData);
    },
    
    findAll(args) {
        return produk.findAll(args);
    },

    getTotalProduct(args) {
        return produk.count(args);
    },

    updateProducts(id, updateArgs) {
        return produk.update(updateArgs, {
          where: {
            id,
          },
        });
    },
    
    isDeletedProducts(id) {
        return produk.destroy({
          where: {
            id,
          },
        });
      },
    


}