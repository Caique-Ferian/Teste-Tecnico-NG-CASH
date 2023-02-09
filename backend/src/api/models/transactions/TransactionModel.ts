import { Op } from 'sequelize';
import IModel, { ICreateTransaction } from '../../interfaces/transactions/IModel';
import Accounts from '../../../database/models/AccountModel';
import Users from '../../../database/models/UserModel';
import Transactions from '../../../database/models/TransactionsModel';

export default class TransactionModel implements IModel<Transactions, Accounts> {
  constructor(
    private _transModel: typeof Transactions,
    private _accountModel: typeof Accounts,
  ) { }

  public async findOne(id:number): Promise<Accounts | null> {
    return this._accountModel.findOne({ where: { id } });
  }

  public async create(obj: ICreateTransaction<Accounts>): Promise<Transactions> {
    const { balance, accounts } = obj;
    await Promise.all(accounts.map(async (account, index) => {
      const value = index === 0 ? account.balance - balance
        : account.balance + balance;
      await this._accountModel.update({ balance: value }, { where: { id: account.id } });
    }));
    return this._transModel
      .create({
        debitedAccountId: accounts[0].id,
        creditedAccountId: accounts[1].id,
        value: balance,
        createdAt: new Date(),
      });
  }

  public async findAll(type:string | null, id:number): Promise<Transactions[]> {
    if (type === 'credited_account_id') {
      return this._transModel.findAll({
        where: { creditedAccountId: id },
        attributes: { exclude: ['id'] },
        order: [[type, 'DESC']],
        include: [{
          model: Users,
          as: 'creditedUser',
          attributes: { exclude: ['id', 'password', 'accountId'] },
        }, {
          model: Users,
          as: 'debitedUser',
          attributes: { exclude: ['id', 'password', 'accountId'] },
        }] });
    }
    if (type === 'debited_account_id') {
      return this._transModel.findAll({
        where: { debitedAccountId: id },
        attributes: { exclude: ['id'] },
        order: [[type, 'DESC']],
        include: [{
          model: Users,
          as: 'creditedUser',
          attributes: { exclude: ['id', 'password', 'accountId'] },
        }, {
          model: Users,
          as: 'debitedUser',
          attributes: { exclude: ['id', 'password', 'accountId'] },
        }] });
    }
    return this._transModel.findAll({
      where: {
        [Op.or]: [{ debitedAccountId: id }, { creditedAccountId: id }] },
      attributes: { exclude: ['id'] },
      order: [['created_at', 'DESC']],
      include: [{
        model: Users,
        as: 'creditedUser',
        attributes: { exclude: ['id', 'password', 'accountId'] },
      }, {
        model: Users,
        as: 'debitedUser',
        attributes: { exclude: ['id', 'password', 'accountId'] },
      }] });
  }
}
