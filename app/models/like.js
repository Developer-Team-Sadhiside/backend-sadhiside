'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Like.belongsTo(models.Products, {
        foreignKey: 'id_produk'
      })

      Like.belongsTo(models.Users, {
        foreignKey: 'id_pembeli'
      })
    }
  }
  Like.init({
    isLike: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    id_produk: DataTypes.INTEGER,
    id_pembeli: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};