'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Products.belongsTo(models.Users,{
        foreignKey: 'id_user',
      })
      // define association here
    }
  }
  Products.init({
    id_user:DataTypes.INTEGER,
    nama_produk: DataTypes.STRING,
    harga_produk: DataTypes.INTEGER,
    gambar: DataTypes.ARRAY(DataTypes.TEXT),
    kategori: DataTypes.STRING,
    deskripsi: DataTypes.STRING,
    totalLike: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    status: DataTypes.ENUM({
      values: ["tersedia", "pending", "tersedia"],
      defaultValue: "tersedia",
    }),
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};