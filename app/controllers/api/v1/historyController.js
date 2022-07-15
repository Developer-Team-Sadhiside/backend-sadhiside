const historyService = require('../../../services');

module.exports = {
  async getProductBid(req, res) {
    await historyService.api.v1.historyService.getBidProduct(req.user.id)
      .then((data) => {
        res.status(200).json({
          status: 'OK',
          produk: data,
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
