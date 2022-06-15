const { Users } = require("../models");

module.exports = {
  create(reqBody) {
    return Users.create(reqBody);
  },
};
