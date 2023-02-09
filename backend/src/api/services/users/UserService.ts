import Users from '../../../database/models/UserModel';
import IModel from '../../interfaces/users/IModel';
import IService, { IResponse } from '../../interfaces/users/IService';
import validateRegister from '../../utils/validateRegister';
import generateHash from '../../utils/generateHash';
import Middlewares from '../../middlewares';

export default class UserService implements IService<Users> {
  constructor(private _model: IModel<Users>) { }

  public async register(obj: Partial<Users>): Promise<IResponse<Users>> {
    const { username, password } = obj;
    const validation = validateRegister(username, password);
    if (validation === 0) throw new Error('badRequestUser');
    if (validation === 1) throw new Error('badRequestPassword');
    const hasUser = username ? await this._model.findOne(username) : null;
    if (hasUser) throw new Error('alreadyExists');
    const newUser = await this._model.create({ username, password: generateHash(password) });
    return { code: 201,
      data: {
        id: newUser?.id,
        username: newUser?.username,
        accountId: newUser?.accountId } as Users };
  }

  public async login(obj: Users): Promise<IResponse<Users>> {
    const { username, password } = obj;
    const hasUser = await this._model.findOne(username);
    if (!hasUser) throw new Error('notFound');
    if (generateHash(password) !== hasUser.password) throw new Error('badRequestLogin');
    const token = Middlewares.createJwt({ username, accountId: hasUser.accountId });
    return { code: 200, token };
  }

  public async findOne(username:string): Promise<IResponse<Users | null>> {
    const user = await this._model.findOne(username);
    if (!user) throw new Error('notFound');
    return { code: 200, data: user };
  }
}
