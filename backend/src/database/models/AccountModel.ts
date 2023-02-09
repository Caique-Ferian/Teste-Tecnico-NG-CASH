import { Model, INTEGER, FLOAT } from 'sequelize';
import db from '.';

class Accounts extends Model {
  id!: number;
  balance!: number;
}

Accounts.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  balance: {
    type: FLOAT,
    allowNull: false,
  },
}, { sequelize: db, modelName: 'accounts', timestamps: false });

export default Accounts;
