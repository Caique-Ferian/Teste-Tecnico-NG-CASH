import { Response } from 'express';
import IRequest from '../../interfaces/users/IRequest';
import IService from '../../interfaces/transactions/IService';
import Transactions from '../../../database/models/TransactionsModel';

export default class TransactionController {
  constructor(private _service: IService<Transactions>) { }

  public async transaction(req: IRequest, res: Response) {
    if (req.user) {
      const { balance, accountId } = req.body;
      const { code, data } = await this._service.transaction(
        { balance: +balance, accountsIds: [req.user.accountId, accountId] },
      );
      return res.status(code).json(data);
    }
  }

  public async findAll(req: IRequest, res: Response) {
    if (req.user) {
      const type = req.query.filter ? req.query.filter as string : null;
      const { code, data } = await this._service.findAll(type, req.user.accountId);
      return res.status(code).json(data);
    }
  }
}
