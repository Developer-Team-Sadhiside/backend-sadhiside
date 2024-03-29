const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Products.belongsTo(models.Users, {
        foreignKey: 'id_user',
      });

      Products.hasMany(models.Like, {
        foreignKey: 'id_produk',
      });

      Products.hasOne(models.Purchase, {
        foreignKey: 'id_produk',
      });
    }
  }
  Products.init({
    id_user: DataTypes.INTEGER,
    nama_produk: DataTypes.STRING,
    harga_produk: DataTypes.FLOAT,
    gambar: DataTypes.ARRAY(DataTypes.TEXT),
    kategori: DataTypes.STRING,
    deskripsi: DataTypes.STRING,
    totalLike: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    status: DataTypes.ENUM({
      values: ['tersedia', 'pending', 'terjual'],
      defaultValue: 'tersedia',
    }),
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};
