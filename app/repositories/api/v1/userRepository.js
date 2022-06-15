const { Users } = require("../../../models");

module.exports = {
  async findByUsername(username){
    return await Users.findByPk(username);
  },

  async save(saveArgs){
    return await Users.create(saveArgs);
  },

  // async getColumnName() {
  //   return Admins.rawAttributes;
  // },


  // async update(updateArgs, username) {
  //   return Admins.update(updateArgs, { where: { username: username } });
  // },
}