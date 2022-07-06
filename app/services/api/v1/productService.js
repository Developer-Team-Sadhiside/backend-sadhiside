const productRepository = require("../../../repositories");

module.exports = {
    async addProduct(reqBody) {
        return await productRepository.api.v1.productRepository.addProduct(reqBody);
    },

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

    async getByCategory(kategori) {
      try {
        const product = await productRepository.api.v1.productRepository.findByCategory(kategori);
        const productCount = await productRepository.api.v1.productRepository.getTotalProductByCategory(kategori);
  
        return {
          data:product,
          count: productCount,
        };
      } catch (err) {
        throw err;
      }
  },

    async update(id, reqBody) {
        return await productRepository.api.v1.productRepository.updateProducts(id, reqBody);
    },

    async isDeletedProducts(id) {
      return await productRepository.api.v1.productRepository.isDeletedProducts(id);
    },   
}