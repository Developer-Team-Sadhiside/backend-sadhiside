const { Purchase } = require('../../../models');
const { Products } = require('../../../models');
const { Users } = require('../../../models');

module.exports = {
  async findBidProductSeller(id) {
    return await Purchase.findAll({
      include: [{
        model: Products,
        where: {
          id_user: id,
        },
      }, {
        model: Users,
      },
      ],
    });
  },
};
