const userService = require("../../../services");
const auth = require("../../../middlewares")

module.exports = {
  async authorize(req, res, next) {
    try {
      if (req.headers.authorization === undefined) {
        next();
        return;
      }
      req.user = await auth.authorize(
        req.headers.authorization
      );
      next();
    } catch (err) {
      res.status(err.status || 400).json({
        message: err.message,
      });
    }
  },
  async postRegister(req, res) {
    try {
      const user = await userService.api.v1.userService.register(req.user, req.body);
      res.status(202).json({
        nama: user.nama,
        email: user.email,
        role: user.role,
      });
    } catch (err) {
      res.status(err.status || 400).json({
        message: err.message,
      });
    }
  },

  async postLogin(req, res) {
    try {
      const token = await userService.api.v1.userService.login(req.body);
      res.status(200).json({ token });
    } catch (err) {
      res.status(err.status || 400).json({ message: err.message });
    }
  },

  async currentUser(req, res) {
    res.status(200).json({
      nama: req.user?.nama,
    });
  },
};
