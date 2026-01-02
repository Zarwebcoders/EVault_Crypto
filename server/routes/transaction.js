const express = require('express');
const {
    requestWithdrawal,
    getMyTransactions,
    getAdminTransactions,
    updateTransaction,
} = require('../controllers/transactionController.js');
const { protect } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.route('/')
    .get(protect, getMyTransactions);

router.post('/withdraw', protect, requestWithdrawal);

router.route('/admin')
    .get(protect, getAdminTransactions);

router.route('/:id')
    .put(protect, updateTransaction);

module.exports = router;
