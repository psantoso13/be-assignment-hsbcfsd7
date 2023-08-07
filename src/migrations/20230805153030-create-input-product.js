'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('inputProducts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      gambar_product: {
        type: Sequelize.STRING
      },
      nama_product: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },      
      ket_product: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      stock_product: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('inputProducts');
  }
};