'use strict';
const path = require('path');

const image1 = path.resolve(__dirname, '../../docs/assets/1.jpg');
const image2 = path.resolve(__dirname, '../../docs/assets/2.jpg');
const image3 = path.resolve(__dirname, '../../docs/assets/3.jpg');
const image4 = path.resolve(__dirname, '../../docs/assets/4.jpg');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [{
      id_user: 2,
      nama_produk: 'Laptop Alienware',
      harga_produk: 30000000,
      gambar: [image1,image2,image3,image4],
      kategori: 'Laptop',
      deskripsi: 'Laptop Gaming',
      totalLike: 0,
      status: 'tersedia',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id_user: 2,
      nama_produk: 'Laptop Alienware 2',
      harga_produk: 20000000,
      gambar: [image1,image2,image3,image4],
      kategori: 'Laptop',
      deskripsi: 'Laptop Gaming',
      totalLike: 0,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id_user: 2,
      nama_produk: 'Laptop Alienware 3',
      harga_produk: 40000000,
      gambar: [image1,image2,image3,image4],
      kategori: 'Laptop',
      deskripsi: 'Laptop Gaming',
      totalLike: 0,
      status: 'terjual',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
