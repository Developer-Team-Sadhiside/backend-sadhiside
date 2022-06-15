const authRepository = require("../repositories/authRepository");
const bcrypt = require("bcryptjs");
const SALT = 10;

function encryptPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, SALT, (err, encryptedPassword) => {
      if (err) return reject(err);
      return resolve(encryptedPassword);
    });
  });
}

module.exports = {
  async create(reqBody) {
    try {
      reqBody.password = await encryptPassword(reqBody.password);
      return authRepository.create(reqBody);
    } catch (err) {
      return err;
    }
  },
};
