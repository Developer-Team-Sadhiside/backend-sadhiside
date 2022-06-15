const authService = require("../../../services");

module.exports = {
  async authorize(req, res, next) {
    try {
      if (req.headers.authorization === undefined) {
        next();
        return;
      }
      req.user = await authService.api.v1.authService.authorize(
        req.headers.authorization
      );
      next();
    } catch (err) {
      res.status(err.status || 400).json({
        message: err.message,
      });
    }
  },
};
