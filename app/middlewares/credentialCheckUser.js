const userService = require('../services');

module.exports = {
  async checkUserRole(req, res, next) {
    try {
    const check = await userService.api.v1.userService.getUser(req.user.id)
      if(!check.kota && !check.alamat && !check.no_hp){
        res.status(404).json({
            status: 'FAIL',
            message: "You don't have permitted to access this point, if you access please complete your profile",
          });
      } else {
        next()
      }
    } catch (err) {
      res.status(400).json({
        status: 'failed',
        message: [err.message],
      });
    }
  },
};
