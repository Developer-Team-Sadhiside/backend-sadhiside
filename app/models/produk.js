'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class produk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      produk.belongsTo(models.Users, {
        foreignKey: 'id_user',
      })
      // define association here
    }
  }
  produk.init({
    id_user:DataTypes.INTEGER,
    nama_produk: DataTypes.STRING,
    harga_produk: DataTypes.STRING,
    gambar: DataTypes.STRING,
    kategori: DataTypes.STRING,
    deskripsi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'produk',
  });
  return produk;
};