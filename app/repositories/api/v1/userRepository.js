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
  async save(saveArgs) {
    return await Users.create(saveArgs);
  },

}