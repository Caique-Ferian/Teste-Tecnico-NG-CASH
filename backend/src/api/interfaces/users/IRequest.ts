import { Request } from 'express';

export type Login = {
  username: string,
  accountId: number,
};

export default interface IRequest extends Request {
  user?: Login;
}
