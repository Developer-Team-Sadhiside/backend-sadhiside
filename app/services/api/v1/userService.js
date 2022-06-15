const userRepository = require("../../../repositories");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config;
const SALT = 10;

function encryptPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, SALT, (err, encryptedPassword) => {
      if (err) return reject(err);
      return resolve(encryptedPassword);
    });
  });
}

function checkPassword(password, encryptedPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, encryptedPassword, (err, encryptedPassword) => {
      if (err) reject(err);
      resolve(encryptedPassword);
    });
  });
}

function createToken(payload) {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
}

module.exports = {
  async register(user, reqBody) {
    try {
      if (!reqBody.username)
        throw { status: 422, message: "username field cannot empty" };
      if (!reqBody.fullname)
        throw { status: 422, message: "fullname field cannot empty" };
      if (!reqBody.password)
        throw { status: 422, message: "password field cannot empty" };
      if (!reqBody.role)
        throw { status: 422, message: "role field cannot empty" };
      if (
        !(
          reqBody.role === "superadmin" ||
          reqBody.role === "member" ||
          reqBody.role === "admin"
        )
      )
        throw {
          status: 422,
          message: "set role to member, admin or superadmin",
        };
      if (reqBody.role === "admin") {
        if (!(user || user?.role === "member" || user?.role === "admin"))
          throw { status: 401, message: "login as superadmin needed to this action" };
      }
      if (
        await userRepository.api.v1.userRepository.findByUsername(
          reqBody.username
        )
      )
        throw { status: 409, message: "choose another username" };
      reqBody.password = await encryptPassword(reqBody.password);
      return userRepository.api.v1.userRepository.save(reqBody);
    } catch (err) {
      throw err;
    }
  },

  async login(reqBody) {
    try {
      if (!reqBody.username)
        throw { status: 422, message: "username field cannot empty" };
      if (!reqBody.password)
        throw { status: 422, message: "password field cannot empty" };
      const user = await userRepository.api.v1.userRepository.findByUsername(
        reqBody.username
      );
      if (!user) throw { status: 401, message: "username or password wrong" };
      if (!checkPassword(reqBody.password, user.password))
        throw { status: 401, message: "username or password wrong" };
      return createToken({
        username: user.username,
        fullname: user.fullname,
      });
    } catch (err) {
      throw err;
    }
  },

  async update(username, reqBody) {
    const admin = await this.findByUsername(username);
    return adminRepository.api.v1.adminRepository.update(
      reqBody,
      admin.username
    );
  },
};
