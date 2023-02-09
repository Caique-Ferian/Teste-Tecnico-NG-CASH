import IModel from '../../interfaces/users/IModel';
import Accounts from '../../../database/models/AccountModel';
import Users from '../../../database/models/UserModel';

export default class UserModel implements IModel<Users> {
  constructor(private _userModel: typeof Users, private _accountModel: typeof Accounts) { }
  public async create(obj: Partial<Users>): Promise<Users | null> {
    const { id } = await this._accountModel.create({ balance: 100.00 });
    return this._userModel.create({ ...obj, accountId: id });
  }

  public async findOne(username: string): Promise<Users | null> {
    return this._userModel.findOne({ where: { username },
      include: [{ model: Accounts, as: 'userBalance' }] });
  }
}
