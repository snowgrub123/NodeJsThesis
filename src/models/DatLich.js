"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class DatLich extends Model {
        static associate(models) {
            DatLich.belongsTo(models.User,
                {
                    foreignKey: 'benhNhanID',
                    targetKey: 'id',
                    as: 'benhNhanData'
                })
            DatLich.belongsTo(models.allCodes,
                {
                    foreignKey: 'timeType',
                    targetKey: 'keyMap',
                    as: 'timeTypeDataPatient'
                })
        }
    }
    DatLich.init(
        {
            trangThaiID: DataTypes.STRING,
            giaoVienID: DataTypes.INTEGER,
            benhNhanID: DataTypes.INTEGER,
            date: DataTypes.STRING,
            timeType: DataTypes.STRING,
            token: DataTypes.STRING
        },
        {
            sequelize,
            modelName: "DatLich",
            freezeTableName: true
        }
    );
    return DatLich;
};
