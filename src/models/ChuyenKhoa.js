"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class ChuyenKhoa extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // ChuyenKhoa.hasMany(models.User, { foreignKey: 'viTriID', as: 'positionData' })
            // ChuyenKhoa.hasMany(models.User, { foreignKey: 'gioiTinh', as: 'genderData' })
            // ChuyenKhoa.hasMany(models.schedules, { foreignKey: 'timeType', as: 'timeTypeData' })

            // ChuyenKhoa.hasMany(models.teacher_Infor, { foreignKey: 'priceID', as: 'priceTypeData' })
            // ChuyenKhoa.hasMany(models.teacher_Infor, { foreignKey: 'provinceID', as: 'provinceTypeData' })
            // ChuyenKhoa.hasMany(models.teacher_Infor, { foreignKey: 'paymentID', as: 'paymentTypeData' })

        }
    }
    ChuyenKhoa.init(
        {
            tenChuyenKhoa: DataTypes.STRING,
            hinhAnh: DataTypes.TEXT,
            mieuTaHTML: DataTypes.TEXT,
            mieuTaMarkdown: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: "ChuyenKhoa",
            freezeTableName: true
        }
    );
    return ChuyenKhoa;
};
