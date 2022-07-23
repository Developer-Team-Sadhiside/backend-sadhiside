'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    const password = "123456";
    const encryptedPassword = bcrypt.hashSync(password, 10)

    await queryInterface.bulkInsert('Users', [{
      nama: 'buyer',
      email: 'buyer@gmail.com',
      password: encryptedPassword,
      kota: 'Menara Kudus',
      alamat: 'jln yang indah dengan mu',
      no_hp: '081244566881',
      foto: 'https://ik.imagekit.io/rizkioktav70/IMG-1657790861342_OnN1TnQ0j.img',
      role: ['buyer'],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      nama: 'seller',
      email: 'seller@gmail.com',
      password: encryptedPassword,
      kota: 'Semarang',
      alamat: 'Krapyak',
      no_hp:'081235333554',
      foto: 'https://ik.imagekit.io/rizkioktav70/IMG-1657790861342_OnN1TnQ0j.img',
      role: ['buyer','seller'],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      nama: 'buyernoprofile',
      email: 'buyernoprofile@gmail.com',
      password: encryptedPassword,
      kota: null,
      alamat: null,
      no_hp: null,
      foto: null,
      role: ['buyer'],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
