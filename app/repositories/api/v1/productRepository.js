const { produk } = require("../../../models");

module.exports = {
    addProduct(inputData) {
        return produk.create(inputData);
    },

    // findOne(key) {
    //     return cars.findOne(key);
    // },
    findAll(args) {
        return produk.findAll(args);
    },
    
    getTotalProduct(args) {
        return produk.count(args);
    },

    // find(id) {
    //     return cars.findByPk(id);
    // },
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