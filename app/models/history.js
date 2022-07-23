const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      History.belongsTo(models.Purchase, {
        foreignKey: 'id_pembelian',
      });

      History.belongsTo(models.Users, {
        foreignKey: 'id_pembeli',
      });

      History.belongsTo(models.Users, {
        foreignKey: 'id_penjual',
      });
    }
  }
  History.init({
    id_pembelian: DataTypes.INTEGER,
    id_pembeli: DataTypes.INTEGER,
    id_penjual: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};
