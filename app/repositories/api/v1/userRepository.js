const { Users } = require("../../../models");

module.exports = {
  async findByName(nama) {
    return await Users.findOne({
      where: { nama }
    });
  },
  
  async findByEmail(email) {
    return await Users.findOne({
      where: { email }
    });
  },

  async findById(id) {
    return await Users.findByPk(id);
  },

  async addProfil(id, userArgs) {
    await Users.update(userArgs, { where: { id } });
  },

  async save(saveArgs) {
    return await Users.create(saveArgs);
  },

}