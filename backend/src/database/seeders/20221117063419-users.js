'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('users',[
      {
        username: 'fulano',
        password: '303e855e7e5631bfcc829bf493dfa596', //fulaNo123
        account_id: 1
      },
      {
        username: 'ciclano',
        password: 'ef27745f9832c525734a22a3e2c31c72', //ciclaNo123
        account_id: 2
      },
      {
        username: 'beltrano',
        password: 'e3265ec38610b047e0e6efb2dd62e343', //beltraNo123
        account_id: 3
      },
    ]);
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('users',null,{});
  }
};
