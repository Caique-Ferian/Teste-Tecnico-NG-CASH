import { Request, Response } from 'express';
import IService from '../../interfaces/users/IService';
import Users from '../../../database/models/UserModel';

export default class UserController {
  constructor(private _service: IService<Users>) { }

  public async register(req: Request, res: Response) {
    const { code, data } = await this._service.register(req.body);
    return res.status(code).json(data);
  }

  public async login(req: Request, res: Response) {
    const { code, token } = await this._service.login(req.body);
    return res.status(code).json({ token });
  }

  public async findOne(req: Request, res: Response) {
    const { code, data } = await this._service.findOne(req.query.username as string);
    return res.status(code).json(data);
  }
}
