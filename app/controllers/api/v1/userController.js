const userService = require('../../../services');
const auth = require('../../../middlewares/authentication');

module.exports = {
  async authorize(req, res, next) {
    try {
      if (req.headers.authorization === undefined) {
        throw new Error('Must register account and login first!');
      }
      const user = await auth.authorize(req.headers.authorization);
      req.user = user[1];
      req.role = user[0].role;
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
      res.status(201).json({
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
      res.status(202).json({ token });
    } catch (err) {
      res.status(err.status || 400).json({
        message: err.message,
      });
    }
  },

  async postProfile(req, res) {
    try{
      const { nama, kota, alamat, no_hp } = req.body;
      const data = await userService.api.v1.userService.profile(req.user.id, {
        nama,
        kota,
        alamat,
        no_hp,
        foto: req.image[0],
        role: ['buyer', 'seller'],
      })
      await 
      res.status(201).json({
        status: 'Success',
        data,
      });
    }catch(err){
      res.status(400).json({
        status: 'FAIL',
        message: err.message,
      });
    }
  },

  async whoAmI(req, res) {
    await userService.api.v1.userService.getUser(req.user.id)
      .then((user) => {
        res.status(201).json({
          status: 'Success',
          user,
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: 'FAIL',
          message: err.message,
        });
      });
  },
};
