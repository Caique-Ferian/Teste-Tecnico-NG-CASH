'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('transactions',[
      {
        debited_account_id: 1,
        credited_account_id: 2,
        value: 100,
        created_at: new Date(),
      },
      {
        debited_account_id: 1,
        credited_account_id: 3,
        value: 200,
        created_at: new Date(),
      },
      {
        debited_account_id: 2,
        credited_account_id: 3,
        value: 300,
        created_at: new Date(),
      },
      {
        debited_account_id: 2,
        credited_account_id: 1,
        value: 50,
        created_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('transactions',null,{});

  }
};
