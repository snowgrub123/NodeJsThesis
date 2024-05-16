"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class schedules extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            schedules.belongsTo(models.allCodes,
                {
                    foreignKey: 'timeType',
                    targetKey: 'keyMap',
                    as: 'timeTypeData'
                })

            schedules.belongsTo(models.User,
                {
                    foreignKey: 'giaoVienID',
                    targetKey: 'id',
                    as: 'doctorData'
                })


        }
    }
    schedules.init(
        {
            currentNumber: DataTypes.INTEGER,
            maxNumber: DataTypes.INTEGER,
            date: DataTypes.STRING,
            timeType: DataTypes.STRING,
            giaoVienID: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "schedules",
        }
    );
    return schedules;
};
