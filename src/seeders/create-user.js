'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      ho: 'Dang',
      ten: 'Khang',
      tenDangNhap: 'khangdang712@gmail.com',
      diaChi: '123 pham ngu lao',
      gioiTinh: 'Nam',
      vaiTro: 'Giao vien',
      soDT: '093201111111',
      image: null,
      chuyenMon: 'Toan',

      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
