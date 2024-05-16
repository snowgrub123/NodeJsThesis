'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('markdowns', {

            // contentHTML: DataTypes.TEXT('long'),
            // contentMarkdown: DataTypes.TEXT('long'),
            // moTa: DataTypes.TEXT('long'),
            // giaoVienID: DataTypes.INTEGER,
            // trungTamID: DataTypes.INTEGER,
            // chuyenMonID: DataTypes.INTEGER,

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            contentHTML: {
                allowNull: false,
                type: Sequelize.TEXT('long')
            },
            contentMarkdown: {
                allowNull: false,
                type: Sequelize.TEXT('long')
            },
            moTa: {
                allowNull: true,
                type: Sequelize.TEXT('long')
            },
            giaoVienID: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            trungTamID: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            chuyenMonID: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            //
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
        await queryInterface.dropTable('markdowns');
    }
};