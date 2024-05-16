'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.allCodes, { foreignKey: 'viTriID', targetKey: 'keyMap', as: 'positionData' })
      User.belongsTo(models.allCodes, { foreignKey: 'gioiTinh', targetKey: 'keyMap', as: 'genderData' })
      User.hasOne(models.markdowns, { foreignKey: 'giaoVienID' })
      User.hasOne(models.teacher_Infor, { foreignKey: 'giaoVienID' })
      User.hasMany(models.schedules, { foreignKey: 'giaoVienID', as: 'DoctorData' })
      User.hasMany(models.DatLich, { foreignKey: 'benhNhanID', as: 'bennhNhanData' })




    }
  }
  User.init({
    ho: DataTypes.STRING,
    ten: DataTypes.STRING,
    email: DataTypes.STRING,
    matKhau: DataTypes.STRING,
    soDT: DataTypes.INTEGER,
    diaChi: DataTypes.STRING,
    gioiTinh: DataTypes.STRING,
    vaiTroID: DataTypes.STRING,
    viTriID: DataTypes.STRING,
    avatar: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};