import 'dotenv/config';
import { verify } from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import IRequest from '../interfaces/users/IRequest';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

const validateJWT = (req: IRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token not found' });
  try {
    const decoded = verify(token, JWT_SECRET);
    if (typeof decoded !== 'string') {
      req.user = { username: decoded.username, accountId: decoded.accountId };
      next();
    }
  } catch (err) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default validateJWT;
