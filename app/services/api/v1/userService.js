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
      if (!reqBody.nama)
        throw { status: 422, message: "name field cannot empty" };
      if (!reqBody.email)
        throw { status: 422, message: "email field cannot empty" };
      if (!reqBody.password)
        throw { status: 422, message: "password field cannot empty" };
      if (!reqBody.role)
        throw { status: 422, message: "role field cannot empty" };
      if (
        !(
          reqBody.role === "seller" ||
          reqBody.role === "buyer"
        )
      )
        throw {
          status: 422,
          message: "set role to buyer or and seller",
        };
      if (reqBody.role === "seller") {
        if (!(user || user?.role === "buyer"))
          throw { status: 401, message: "must role buyer" };
      }
      if (
        await userRepository.api.v1.userRepository.getOne({
          where: { nama }
      })
      )
        throw { status: 409, message: "choose another name" };
      if (
        await userRepository.api.v1.userRepository.Users.getOne({
          where: { email }
      })
      )
        throw { status: 409, message: "choose another email" };
      reqBody.password = await encryptPassword(reqBody.password);
      return userRepository.api.v1.userRepository.save(reqBody);
    } catch (err) {
      throw err;
    }
  },

  async login(reqBody) {
    try {
      if (!reqBody.email)
        throw { status: 422, message: "email field cannot empty" };
      if (!reqBody.password)
        throw { status: 422, message: "password field cannot empty" };
      const email = await userRepository.api.v1.userRepository.getOne({
        where: { email }
    });
      if (!email) 
        throw { status: 401, message: "email or password wrong" };
      if (!checkPassword(reqBody.password, user.password))
        throw { status: 401, message: "name or password wrong" };
      return createToken({
        email: user.email,
      });
    } catch (err) {
      throw err;
    }
  },
};
