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

  async postProfile(req, res) {
    const { kota, alamat, no_hp } = req.body;
    const user = await userService.api.v1.userService.get(req.params.id)
    if (!user) {
      res.status(404).json({
        status: "FAIL",
        message: `user not found!`,
      });
      return;
    }
    userService.api.v1.userService.profile(req.params.id, {
      kota,
      alamat,
      no_hp
    }).then(() => {
      res.status(200).json({
        
        nama:user.nama,
        email:user.email,
        kota:user.kota,
        alamat:user.alamat,
        no_hp:user.no_hp

      });
    }).catch((err) => {
      res.status(422).json({
        status: "FAIL",
        message: err.message,
      });
    });
  },

  // async postUpdate(req, res) {
  //   try {
  //     const admin = adminService.api.v1.adminService.update(
  //       req.params.username,
  //       req.body
  //     );
  //     res.status(200).json({ message: "success update" });
  //   } catch (err) {}
  // },


};
