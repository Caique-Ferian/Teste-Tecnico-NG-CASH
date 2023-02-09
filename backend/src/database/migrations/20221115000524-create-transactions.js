module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      debitedAccountId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'debited_account_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'accounts', key: 'id' },
      },
      creditedAccountId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'credited_account_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'accounts', key: 'id' },
      },
      value: { allowNull: false, type: Sequelize.FLOAT },
      createdAt: {
        type: Sequelize.DATE,
        field: 'created_at',
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('transactions');
  },
};
