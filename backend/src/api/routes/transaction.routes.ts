import { Router } from 'express';
import TransactionController from '../controllers/transactions/TransactionController';
import TransactionService from '../services/transactions/TransactionService';
import TransactionModel from '../models/transactions/TransactionModel';
import Accounts from '../../database/models/AccountModel';
import Transactions from '../../database/models/TransactionsModel';
import Middlewares from '../middlewares';

const router = Router();

const transactionController = new TransactionController(
  new TransactionService(new TransactionModel(Transactions, Accounts)),
);

router.post('/', Middlewares.validateJwt, transactionController
  .transaction.bind(transactionController));
router.get('/', Middlewares.validateJwt, transactionController.findAll.bind(transactionController));

export default router;
