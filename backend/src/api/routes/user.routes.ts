import { Router } from 'express';
import UserController from '../controllers/users/UserController';
import UserService from '../services/users/UserService';
import UserModel from '../models/users/UserModel';
import Accounts from '../../database/models/AccountModel';
import Users from '../../database/models/UserModel';
import Middlewares from '../middlewares';

const router = Router();

const userController = new UserController(new UserService(new UserModel(Users, Accounts)));

router.post('/register', userController.register.bind(userController));
router.post('/login', userController.login.bind(userController));
router.get('/', Middlewares.validateJwt, userController.findOne.bind(userController));

export default router;
