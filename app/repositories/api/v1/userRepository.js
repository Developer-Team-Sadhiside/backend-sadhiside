const { Users } = require("../../../models");

module.exports = {
  async findByName(nama) {
    return await Users.findByPk(nama);
  },
  async findByEmail(email) {
    return await Users.findByPk(email);
  },
  async save(saveArgs) {
    return await Users.create(saveArgs);
  },

}