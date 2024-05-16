'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('ChuyenKhoa', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            // tenChuyenKhoa: DataTypes.STRING,
            // hinhAnh: DataTypes.STRING,
            // mieuTaHTML: DataTypes.STRING,
            // mieuTaMarkdown: DataTypes.STRING,
            tenChuyenKhoa: {
                type: Sequelize.STRING
            },
            hinhAnh: {
                type: Sequelize.BLOB('long')
            },
            mieuTaHTML: {
                type: Sequelize.TEXT
            },
            mieuTaMarkdown: {
                type: Sequelize.TEXT
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
        await queryInterface.dropTable('ChuyenKhoa');
    }
};