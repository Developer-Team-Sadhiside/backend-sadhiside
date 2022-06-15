const authService = require("../services/authService");

module.exports = {
  register(req, res) {
    res.status(200).render("user/register");
  },

  async create(req, res) {
    authService
      .create(req.body)
      .then((user) => {
        res.redirect("/users");
      })
      .catch((err) => {
        res.status(422).json({
          err,
        });
      });
  },
};
