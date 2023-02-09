import Transactions from '../../../database/models/TransactionsModel';
import Accounts from '../../../database/models/AccountModel';
import IModel from '../../interfaces/transactions/IModel';
import IService, { IResponse, ITransaction } from '../../interfaces/transactions/IService';

export default class TransactionService implements IService<Transactions> {
  constructor(private _model: IModel<Transactions, Accounts>) { }

  public async transaction(obj: ITransaction): Promise<IResponse<Transactions>> {
    const { balance, accountsIds } = obj;
    const hasUsers = await Promise.all(accountsIds.map((e) => this._model.findOne(e)));
    if (hasUsers.includes(null)) throw new Error('notFound');
    if (accountsIds[0] === accountsIds[1] || (hasUsers[0] && hasUsers[0].balance < balance)) {
      throw new Error('notAllowedTransaction');
    }
    const newTransaction = await this._model.create({ balance, accounts: hasUsers as Accounts[] });
    return { code: 201, data: newTransaction };
  }

  public async findAll(type:string | null, id:number): Promise<IResponse<Transactions>> {
    const allTransactions = await this._model.findAll(type, id);
    return { code: 200, data: allTransactions };
  }
}
