const userRepository = require("../../../repositories");

const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  async authorize(reqToken) {
    try {
      if (reqToken == null) throw { status: 401, message: "token needed" };
      const token = reqToken.split("Bearer ")[1];
      const tokenPayload = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET
      );
      return await userRepository.api.v1.userRepository.findByUsername(
        tokenPayload.username
      );
    } catch (err) {
      throw err;
    }
  },
};
