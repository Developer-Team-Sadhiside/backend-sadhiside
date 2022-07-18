module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      nama: 'buyer',
      email: 'buyer@gmail.com',
      password: '123456',
      kota: null,
      alamat: null,
      no_hp: null,
      foto: null,
      role: ['buyer'],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      nama: 'seller',
      email: 'seller@gmail.com',
      password: '123456',
      kota: 'Semarang',
      alamat: 'Krapyak',
      no_hp: 081235333554,
      foto: null,
      role: ['buyer','seller'],
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
