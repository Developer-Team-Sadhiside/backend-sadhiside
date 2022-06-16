const { Users } = require("../../../models");

module.exports = {
  async findByName(name) {
    return await Users.findByPk(name);
  },

  async save(saveArgs) {
    return await Users.create(saveArgs);
  },

}