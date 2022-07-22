const { Purchase, Products, Users } = require('../../../models');

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
      }],
    });
  },

  async findPurchase(id) {
    return await Purchase.findOne({
      where:{
        id: id
      },
      include: [{
        model: Products,
      }, {
        model: Users,
      }],
    })
  },

  async findProductsOfferedBuyer(id) {
    return await Purchase.findAll({
      where: {
        id_pembeli: id
      },
      include: [{
        model: Products,
        where: {
          status: 'pending'
        },
      }]
    })
  },

  async updateOffer(id,args){
    return await Products.update(args,{
      where: {
        id: id
      }
    })
  },

  async findAcceptedOffer(idSeller,idProduct) {
    return await Purchase.findOne({
      where: {
        id_produk: idProduct
      },  
      include: [{
        model: Products,
        where: {
          id_user: idSeller,
          status: "terjual"
        },
      },
      {
        model: Users,
      }],
    })
  },

  async findAcceptedOfferBuyer(id) {
    return await Purchase.findAll({
      where: {
        id_pembeli: id
      },
      include: [{
        model: Products,
        where: {
          status: "terjual"
        },
      }],
    });
  },

  async deletePurchase(id) {
    return await Purchase.destroy({
      where: {
        id_produk: id
      }
    })
  }
};
