const userService = require("../../../services");
const auth = require("../../../middlewares/authentication")
const imageKit = require("../../../../library/imageKit")

module.exports = {
  async authorize(req, res, next) {
    try {
      if (req.headers.authorization === undefined) {
        throw new Error("Must register account and login first!")
      }
      const user = await auth.authorize(req.headers.authorization);
      req.user = user[1]
      req.role = user[0].role
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
      res.status(err.status || 400).json({ 
        message: err.message 
      });
    }
  },

  async postProfile(req, res) {
    console.log(req.image)
    const { kota, alamat, no_hp} = req.body;
    const user = await userService.api.v1.userService.get(req.params.id)
    if (!user) {
      res.status(404).json({
        status: "FAIL",
        message: `user not found!`,
      });
      return;
    }
      await userService.api.v1.userService.profile(req.params.id, {
        kota,
        alamat,
        no_hp,
        foto : req.image[0],
        role : ["buyer","seller"]
      })
      .then(() => {
        res.status(201).json({
          status: "Success",	
          data: {
            kota,
            alamat,
            no_hp,
            foto : req.image[0],
            role : ["buyer","seller"]
          },
        });
      }).catch((err) => {
        res.status(400).json({
          status: "FAIL",
          message: err.message
        });
      });
    },
  };
