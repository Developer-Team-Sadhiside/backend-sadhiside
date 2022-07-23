'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [{
      id_user: 2,
      nama_produk: 'Laptop Alienware',
      harga_produk: 30000000,
      gambar:  ['https://ik.imagekit.io/rizkioktav70/IMG-1658423393141_gUwsg2j5c.img'],
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
      gambar: ['https://ik.imagekit.io/rizkioktav70/IMG-1658423396492_non6irznz.img'],
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
      harga_produk: 20000000,
      gambar: ['https://ik.imagekit.io/rizkioktav70/IMG-1658423396492_non6irznz.img'],
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
      harga_produk: 20000000,
      gambar: ['https://ik.imagekit.io/rizkioktav70/IMG-1658423396492_non6irznz.img'],
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
      harga_produk: 20000000,
      gambar: ['https://ik.imagekit.io/rizkioktav70/IMG-1658423396492_non6irznz.img'],
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
      harga_produk: 20000000,
      gambar: ['https://ik.imagekit.io/rizkioktav70/IMG-1658423396492_non6irznz.img'],
      kategori: 'Laptop',
      deskripsi: 'Laptop Gaming',
      totalLike: 0,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id_user: 2,
      nama_produk: 'Laptop Alienware 4',
      harga_produk: 40000000,
      gambar: ['https://ik.imagekit.io/rizkioktav70/IMG-1658423398621_0XjnqZGpL.img'],
      kategori: 'Laptop',
      deskripsi: 'Laptop Gaming',
      totalLike: 0,
      status: 'terjual',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id_user: 2,
      nama_produk: 'Laptop Alienware 4',
      harga_produk: 40000000,
      gambar: ['https://ik.imagekit.io/rizkioktav70/IMG-1658423398621_0XjnqZGpL.img'],
      kategori: 'Laptop',
      deskripsi: 'Laptop Gaming',
      totalLike: 0,
      status: 'tersedia',
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
