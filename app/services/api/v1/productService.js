const productRepository = require('../../../repositories');

module.exports = {
  async addProduct(reqBody) {
    return await productRepository.api.v1.productRepository.addProduct(reqBody);
  },

  async listAll(args) {
    return await productRepository.api.v1.productRepository.findAll(args);
  },

  async findProduct(id) {
      return await productRepository.api.v1.productRepository.getProduct(id);
  },

  async getByCategory(kategori) {
    try {
      const product = await productRepository.api.v1.productRepository.findByCategory(kategori);
      const productCount = await productRepository.api.v1.productRepository.getTotalProductByCategory(kategori);
      return {
        data: product,
        count: productCount,
      };
    } catch (err) {
      throw err;
    }
  },

  async getProductsUsers(id) {
    try {
      const product = await productRepository.api.v1.productRepository.findProductsUsers(id);
      const productCount = await productRepository.api.v1.productRepository.getTotalProductsUsers(id);
      return {
        data: product,
        count: productCount,
      };
    } catch (err) {
      throw err;
    }
  },

  async sortingProducts(id) {
    try {
      const product = await productRepository.api.v1.productRepository.findProducts(id);
      return {
        data: product,
      };
    } catch (err) {
      throw err;
    }
  },

  async listProductsSold(id) {
    try {
      const product = await productRepository.api.v1.productRepository.findProductsSold(id);
      return {
        data: product,
      };
    } catch (err) {
      throw err;
    }
  },

  async listProductsLike(id) {
    try {
      const product = await productRepository.api.v1.productRepository.findProductsLike(id);
      return {
        data: product,
      };
    } catch (err) {
      throw err;
    }
  },

  async getOneProductLiked(idBuyer,idProduct) {
    return await productRepository.api.v1.productRepository.findOneProductLiked(idBuyer,idProduct)
  },

  async update(id, reqBody) {
    return await productRepository.api.v1.productRepository.updateProducts(id, reqBody);
  },

  async isDeletedProducts(id) {
    return await productRepository.api.v1.productRepository.isDeletedProducts(id);
  },
};
