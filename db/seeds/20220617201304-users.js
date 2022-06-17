'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      nama: "backendjaya",
      email: "backendjaya@gmail.com",
      password: "sipalingbackend",
      kota: null,
      alamat: null,
      no_hp: null,
      role: "buyer",
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
