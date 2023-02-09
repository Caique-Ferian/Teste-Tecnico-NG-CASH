import 'dotenv/config';
import { sign } from 'jsonwebtoken';
import { Login } from '../interfaces/users/IRequest';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

const createJwt = (payload:Login): string => {
  const token = sign(payload, JWT_SECRET, { expiresIn: '24h' });
  return token;
};

export default createJwt;
