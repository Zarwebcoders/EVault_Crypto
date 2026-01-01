import express from 'express';
import {
    requestWithdrawal,
    getMyTransactions,
    getAdminTransactions,
    updateTransaction,
} from '../controllers/transactionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(protect, getMyTransactions);

router.post('/withdraw', protect, requestWithdrawal);

router.route('/admin')
    .get(protect, getAdminTransactions);

router.route('/:id')
    .put(protect, updateTransaction);

export default router;
