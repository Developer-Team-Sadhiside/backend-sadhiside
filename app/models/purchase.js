'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Purchase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      Purchase.belongsTo(models.Products, {
        foreignKey: 'id_produk'
      })

      Purchase.belongsTo(models.Users, {
        foreignKey: 'id_pembeli'
      })
    }
  }
  Purchase.init({
    id_produk: DataTypes.INTEGER,
    id_pembeli: DataTypes.INTEGER,
    tanggal_pembelian: DataTypes.DATE,
    harga_tawar: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Purchase',
  });
  return Purchase;
};