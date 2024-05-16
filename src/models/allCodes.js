"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class allCodes extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            allCodes.hasMany(models.User, { foreignKey: 'viTriID', as: 'positionData' })
            allCodes.hasMany(models.User, { foreignKey: 'gioiTinh', as: 'genderData' })
            allCodes.hasMany(models.schedules, { foreignKey: 'timeType', as: 'timeTypeData' })

            allCodes.hasMany(models.teacher_Infor, { foreignKey: 'priceID', as: 'priceTypeData' })
            allCodes.hasMany(models.teacher_Infor, { foreignKey: 'provinceID', as: 'provinceTypeData' })
            allCodes.hasMany(models.teacher_Infor, { foreignKey: 'paymentID', as: 'paymentTypeData' })
            allCodes.hasMany(models.DatLich, { foreignKey: 'timeType', as: 'timeTypeDataPatient' })

        }
    }
    allCodes.init(
        {
            keyMap: DataTypes.STRING,
            type: DataTypes.STRING,
            value_vi: DataTypes.STRING,
            value_en: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "allCodes",
        }
    );
    return allCodes;
};
