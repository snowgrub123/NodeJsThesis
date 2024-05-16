'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('DatLich', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            // trangThaiID: DataTypes.STRING,
            // giaoVienID: DataTypes.INTEGER,
            // benhNhanID: DataTypes.INTEGER,
            // date: DataTypes.STRING,
            // timeType: DataTypes.STRING,
            trangThaiID: {
                type: Sequelize.STRING
            },
            giaoVienID: {
                type: Sequelize.INTEGER
            },
            benhNhanID: {
                type: Sequelize.INTEGER
            },
            date: {
                type: Sequelize.STRING
            },
            timeType: {
                type: Sequelize.STRING
            },
            token: {
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
        await queryInterface.dropTable('DatLich');
    }
};