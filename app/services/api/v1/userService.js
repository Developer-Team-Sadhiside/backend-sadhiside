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
      if (
        await userRepository.api.v1.userRepository.findByName(reqBody.nama)
      )
        throw { status: 409, message: "choose another name" };
      if (
        await userRepository.api.v1.userRepository.findByEmail(reqBody.email)
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
      console.log(reqBody.email)
      if (!reqBody.email)
        throw { status: 422, message: "email field cannot empty" };
      if (!reqBody.password)
        throw { status: 422, message: "password field cannot empty" };
      const user = await userRepository.api.v1.userRepository.findByEmail(reqBody.email);
      if (!user)
        throw { status: 401, message: "email or password wrong" };
      if (!checkPassword(reqBody.password, user.password))
        throw { status: 401, message: "name or password wrong" };
      return createToken({
        id: user.id,
        nama: user.nama,
        email: user.email,
      }, process.env.ACCESS_TOKEN_SECRET || 'Token', {
        expiresIn: '1h'
      });
    } catch (err) {
      throw err;
    }
  },

  async profile(id, reqBody) {
    return await userRepository.api.v1.userRepository.addProfil(id, reqBody);
  },

  async get(id) {
    return await userRepository.api.v1.userRepository.findById(id);
  },
};
