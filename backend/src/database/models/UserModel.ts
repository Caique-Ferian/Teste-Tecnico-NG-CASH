import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import AccountModel from './AccountModel';

class Users extends Model {
  id!: number;
  username!: string;
  password!: string;
  accountId!: number;
}

Users.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
  accountId: {
    type: INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
}, { sequelize: db, modelName: 'users', timestamps: false, underscored: true });

Users.hasMany(AccountModel, { foreignKey: 'id', as: 'userBalance' });
AccountModel.belongsTo(Users, { foreignKey: 'id', as: 'userBalance' });

export default Users;
