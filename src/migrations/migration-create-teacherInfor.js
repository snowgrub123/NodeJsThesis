
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('teacher_Infor', {

            // giaoVienID: DataTypes.INTEGER,
            // priceID: DataTypes.STRING,
            // provinceID: DataTypes.STRING,
            // paymentID: DataTypes.STRING,
            // nameCentral: DataTypes.STRING,
            // addressCentral: DataTypes.STRING,
            // note: DataTypes.STRING,
            // numberCount: DataTypes.INTEGER
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            giaoVienID: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            // chuyenKhoaID: DataTypes.INTEGER,
            // phongKhamID: DataTypes.INTEGER,
            chuyenKhoaID: {
                type: Sequelize.INTEGER
            },
            phongKhamID: {
                type: Sequelize.INTEGER
            },
            priceID: {
                allowNull: false,


                type: Sequelize.STRING
            },
            paymentID: {
                allowNull: false,

                type: Sequelize.STRING
            },
            provinceID: {
                allowNull: false,

                type: Sequelize.STRING
            },
            nameCentral: {
                allowNull: false,

                type: Sequelize.STRING
            },
            addressCentral: {
                allowNull: false,

                type: Sequelize.STRING
            },
            note: {
                type: Sequelize.STRING
            },
            numberCount: {
                allowNull: false,
                defaultValue: 0,
                type: Sequelize.INTEGER
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
        await queryInterface.dropTable('teacher_Infor');
    }
};