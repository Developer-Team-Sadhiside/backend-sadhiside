const userService = require("../../../services");

module.exports = {
  async postRegister(req, res) {
    try {
      const user = await userService.api.v1.userService.register(req.user, req.body);
      res.status(202).json({
        username: user.username,
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
      username: req.user?.username,
      fullname: req.user?.fullname,
      role: req.user?.role,
    });
  },

  async postUpdate(req, res) {
    try {
      const admin = adminService.api.v1.adminService.update(
        req.params.username,
        req.body
      );
      res.status(200).json({ message: "success update" });
    } catch (err) {}
  },
};
