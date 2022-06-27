const userService = require("../../../services");
const auth = require("../../../middlewares/authentication")
const imageKit = require("../../../../library/imageKit")

module.exports = {
  async authorize(req, res, next) {
    try {
      if (req.headers.authorization === undefined) {
        throw new Error("gaboleh ya")
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
    const { kota, alamat, no_hp} = req.body;
    const user = await userService.api.v1.userService.get(req.params.id)
    const file = req.file;
    if (!user) {
      res.status(404).json({
        status: "FAIL",
        message: `user not found!`,
      });
      return;
    }
    if(file){
        const imageFormat = file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg';
        if(!imageFormat){
          res.status(400).json({
            status: "FAIL",
            message: `Wrong image format`,
          });
        }
        const split = await req.file.originalname.split('.');
        const ext = await split[split.length - 1];
        const photo = await imageKit.upload({
          file: req.file.buffer,
          fileName: `IMG-${Date.now()}.${ext}`
        })
        await userService.api.v1.userService.profile(req.params.id, {
          kota,
          alamat,
          no_hp,
          foto : photo.url,
          role : ["buyer","seller"]
        })
        .then(() => {
          res.status(201).json({
            status: "Success",	
            data: {
              kota,
              alamat,
              no_hp,
              foto : photo.url,
              role : ["buyer","seller"]
            },
          });
        }).catch((err) => {
          res.status(400).json({
            status: "FAIL",
            message: err.message
          });
        });
      }
    },
  };
