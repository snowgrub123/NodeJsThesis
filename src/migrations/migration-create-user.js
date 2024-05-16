'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {

      // ho: DataTypes.STRING,
      // ten: DataTypes.STRING,
      // email: DataTypes.STRING,
      // matKhau: DataTypes.STRING,
      // soDT: DataTypes.INTEGER,
      // diaChi: DataTypes.STRING,
      // gioiTinh: DataTypes.STRING,
      // vaiTroID: DataTypes.INTEGER,
      // avatar: DataTypes.STRING,
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ho: {
        type: Sequelize.STRING
      },
      ten: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      matKhau: {
        type: Sequelize.STRING
      },
      soDT: {
        type: Sequelize.INTEGER
      },
      diaChi: {
        type: Sequelize.STRING
      },
      gioiTinh: {
        type: Sequelize.STRING
      },
      viTriID: {
        type: Sequelize.STRING
      },
      vaiTroID: {
        type: Sequelize.STRING
      },
      avatar: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Users');
  }
};