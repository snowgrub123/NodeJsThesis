"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class teacher_Infor extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // { foreignKey: 'priceID', as: 'priceTypeData' })
            // allCodes.hasMany(models.teacher_Infor, { foreignKey: 'provinceID', as: 'provinceTypeData' })
            // allCodes.hasMany(models.teacher_Infor, { foreignKey: 'paymentID', as: 'paymentTypeData' })
            teacher_Infor.belongsTo(models.User, { foreignKey: 'giaoVienID' })

            teacher_Infor.belongsTo(models.allCodes, { foreignKey: 'provinceID', targetKey: 'keyMap', as: 'provinceTypeData' })
            teacher_Infor.belongsTo(models.allCodes, { foreignKey: 'priceID', targetKey: 'keyMap', as: 'priceTypeData' })
            teacher_Infor.belongsTo(models.allCodes, { foreignKey: 'paymentID', targetKey: 'keyMap', as: 'paymentTypeData', })

        }
    }
    teacher_Infor.init(
        {
            giaoVienID: DataTypes.INTEGER,
            chuyenKhoaID: DataTypes.INTEGER,
            phongKhamID: DataTypes.INTEGER,

            priceID: DataTypes.STRING,
            provinceID: DataTypes.STRING,
            paymentID: DataTypes.STRING,
            nameCentral: DataTypes.STRING,
            addressCentral: DataTypes.STRING,
            note: DataTypes.STRING,
            numberCount: DataTypes.INTEGER
        },
        {
            sequelize,
            modelName: "teacher_Infor",
            freezeTableName: true
        }
    );
    return teacher_Infor;
};
