const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require('../../../repositories');
require('dotenv').config;

const SALT = 10;

function encryptPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, SALT, (err, encryptedPassword) => {
      if (err) return reject(err);
      return resolve(encryptedPassword);
    });
  });
}

function createToken(payload) {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
}

module.exports = {
  async register(user, reqBody) {
    try {
      if (!reqBody.nama) { throw { status: 422, message: 'name field cannot empty' }; }
      if (!reqBody.email) { throw { status: 422, message: 'email field cannot empty' }; }
      if (!reqBody.password) { throw { status: 422, message: 'password field cannot empty' }; }
      if (
        await userRepository.api.v1.userRepository.findByName(reqBody.nama)
      ) { throw { status: 409, message: 'choose another name' }; }
      if (
        await userRepository.api.v1.userRepository.findByEmail(reqBody.email)
      ) { throw { status: 409, message: 'choose another email' }; }
      reqBody.password = await encryptPassword(reqBody.password);
      return userRepository.api.v1.userRepository.save(reqBody);
    } catch (err) {
      throw err;
    }
  },
  async login(reqBody) {
    try {
      const user = await userRepository.api.v1.userRepository.findByEmail(reqBody.email);
      let comparePassword = '';
      if (user != null) {
        comparePassword = await bcrypt.compareSync(reqBody.password, user.password);
      } else {
        comparePassword = false;
      }
      if (!reqBody.email) {
        throw { status: 422, message: 'email field cannot empty' };
      } else if (!reqBody.password || reqBody.password === 'password') {
        throw { status: 422, message: 'password field cannot empty' };
      } else if (user == null) {
        throw { status: 401, message: 'email or password wrong' };
      } else if (!comparePassword) {
        throw { status: 401, message: 'email or password wrong' };
      } else {
        return createToken({
          id: user.id,
          nama: user.nama,
          email: user.email,
          role: user.role,
        }, process.env.ACCESS_TOKEN_SECRET || 'Token', {
          expiresIn: '1h',
        });
      }
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

  async getUser(id) {
    return await userRepository.api.v1.userRepository.findUser(id);
  },
};
