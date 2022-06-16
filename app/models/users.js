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
      // define association here
    }
  }
  Users.init({
    nama: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    kota: DataTypes.STRING,
    alamat: DataTypes.STRING,
    no_hp: DataTypes.INTEGER,
    role: DataTypes.ENUM({
      values: ["seller", "buyer"],
    }),

  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};