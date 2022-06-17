const { Users } = require("../../../models");

module.exports = {
  async findByName(nama) {
    return await Users.findByPk(nama);
  },

  async save(saveArgs) {
    return await Users.create(saveArgs);
  },

}