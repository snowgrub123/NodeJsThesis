"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class PhongKham extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // PhongKham.hasMany(models.User, { foreignKey: 'viTriID', as: 'positionData' })
            // PhongKham.hasMany(models.User, { foreignKey: 'gioiTinh', as: 'genderData' })
            // PhongKham.hasMany(models.schedules, { foreignKey: 'timeType', as: 'timeTypeData' })

            // PhongKham.hasMany(models.teacher_Infor, { foreignKey: 'priceID', as: 'priceTypeData' })
            // PhongKham.hasMany(models.teacher_Infor, { foreignKey: 'provinceID', as: 'provinceTypeData' })
            // PhongKham.hasMany(models.teacher_Infor, { foreignKey: 'paymentID', as: 'paymentTypeData' })

        }
    }
    PhongKham.init(
        {
            tenPhongKham: DataTypes.STRING,
            hinhAnh: DataTypes.TEXT,
            diaChi: DataTypes.STRING,
            mieuTaHTML: DataTypes.TEXT,
            mieuTaMarkdown: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: "PhongKham",
            freezeTableName: true
        }
    );
    return PhongKham;
};
