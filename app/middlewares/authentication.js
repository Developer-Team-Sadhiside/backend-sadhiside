const jwt = require('jsonwebtoken');
const userRepository = require('../repositories');

require('dotenv').config();

module.exports = {
  async authorize(reqToken) {
    try {
      if (reqToken == null) throw { status: 401, message: 'token needed' };
      const token = reqToken.split('Bearer ')[1];
      const tokenPayload = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
      );
      const user = await userRepository.api.v1.userRepository.findById(
        tokenPayload.id,
      );
      return [tokenPayload, user];
    } catch (err) {
      throw err;
    }
  },
};
