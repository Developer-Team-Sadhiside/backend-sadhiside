const productRepository = require("../../../repositories");

module.exports = {
    addProduct(requestBody) {
        return productRepository.api.v1.productRepository.addProduct(requestBody);
    },
    // getOne(key) {
    //     return carsRepository.findOne(key);
    // },
    async listAll(args) {
        try {
          const product = await productRepository.api.v1.productRepository.findAll(args);
          const productCount = await productRepository.api.v1.productRepository.getTotalProduct(args);
    
          return {
            data:product,
            count: productCount,
          };
        } catch (err) {
          throw err;
        }
    },
    // get(id) {
    //     return carsRepository.find(id);
    // },
    update(id, requestBody) {
        return productRepository.api.v1.productRepository.updateProducts(id, requestBody);
    },
    isDeletedProducts(id) {
        return productRepository.api.v1.productRepository.isDeletedProducts(id);
    },   
}