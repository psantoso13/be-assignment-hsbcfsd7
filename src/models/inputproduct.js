'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class inputProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  inputProduct.init({
    gambar_product: DataTypes.STRING,
    nama_product: DataTypes.STRING,
    ket_product: DataTypes.STRING,
    stock_product: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'inputProduct',
  });
  return inputProduct;
};