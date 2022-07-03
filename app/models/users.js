'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.hasMany(models.Products, {
        foreignKey: 'id_user',
      })

      Users.hasMany(models.Like, {
        foreignKey: 'id_pembeli'
      })
    }
  }
  Users.init({
    nama: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    kota: DataTypes.STRING,
    alamat: DataTypes.STRING,
    no_hp: DataTypes.INTEGER,
    foto: DataTypes.STRING,
    role: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: ['buyer'],
    },
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};