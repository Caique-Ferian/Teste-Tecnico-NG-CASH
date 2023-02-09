import { Model, INTEGER, DATE, FLOAT } from 'sequelize';
import db from '.';
// import AccountModel from './AccountModel';
import UserModel from './UserModel';

class Transactions extends Model {
  id!: number;
  debitedAccountId!: number;
  creditedAccountId!: number;
  value!: number;
  createdAt!: Date;
}

Transactions.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  debitedAccountId: {
    type: INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  creditedAccountId: {
    type: INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  value: {
    type: FLOAT,
    allowNull: false,
  },
  createdAt: DATE,
}, { sequelize: db, modelName: 'transactions', underscored: true, timestamps: false });

Transactions.hasMany(
  UserModel,
  { foreignKey: 'accountId', sourceKey: 'debitedAccountId', as: 'debitedUser' },
);
UserModel.belongsTo(
  Transactions,
  { targetKey: 'debitedAccountId', foreignKey: 'accountId', as: 'debitedUser' },
);
Transactions.hasMany(UserModel, { foreignKey: 'accountId',
  sourceKey: 'creditedAccountId',
  as: 'creditedUser' });
UserModel.belongsTo(Transactions, { targetKey: 'creditedAccountId',
  foreignKey: 'accountId',
  as: 'creditedUser' });

export default Transactions;
