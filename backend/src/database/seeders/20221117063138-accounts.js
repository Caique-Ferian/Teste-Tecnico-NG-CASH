'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('accounts',[
      {
        balance: 300.00
      },
      {
        balance: 400.00
      },
      {
        balance: 500.00
      }
    ]);
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('accounts',null,{});
  }
};
