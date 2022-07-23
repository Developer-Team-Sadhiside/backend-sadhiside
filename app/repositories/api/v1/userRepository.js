const { Users } = require('../../../models');

module.exports = {
  async findByName(nama) {
    return await Users.findOne({
      where: { nama },
    });
  },

  async findByEmail(email) {
    return await Users.findOne({
      where: { email },
    });
  },

  async findById(id) {
    return await Users.findByPk(id);
  },

  async findUser(id) {
    return await Users.findOne({
      where: { id },
      attributes: {
        exclude: ['password', 'createdAt', 'updateAt'],
      },
    });
  },

  async addProfil(id, userArgs) {
    return await Users.update(userArgs, { 
      where: { id } 
    });
  },

  async save(saveArgs) {
    return await Users.create(saveArgs);
  },

};
