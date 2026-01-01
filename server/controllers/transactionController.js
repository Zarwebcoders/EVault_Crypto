import Transaction from '../models/Transaction.js';
import User from '../models/User.js';

// @desc    Request a withdrawal
// @route   POST /api/transactions/withdraw
// @access  Private
export const requestWithdrawal = async (req, res) => {
    const { amount, method, address } = req.body;

    try {
        const user = await User.findById(req.user._id);

        if (user.balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        const transaction = new Transaction({
            user: req.user._id,
            type: 'Withdrawal',
            amount,
            method,
            address,
            status: 'Pending',
        });

        const createdTransaction = await transaction.save();

        // Optional: Deduct balance immediately or wait for approval?
        // For now, we'll wait for approval to deduct/update real balance, 
        // or deduct and hold in 'pending'. Simplified: just create record.

        res.status(201).json(createdTransaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get my withdrawals
// @route   GET /api/transactions
// @access  Private
export const getMyTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user._id }).sort({ date: -1 });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all withdrawals (Admin)
// @route   GET /api/transactions/admin
// @access  Private/Admin
export const getAdminTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({}).populate('user', 'id name email');
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update withdrawal status (Approve/Reject)
// @route   PUT /api/transactions/:id
// @access  Private/Admin
export const updateTransaction = async (req, res) => {
    const { status, txId } = req.body;

    try {
        const transaction = await Transaction.findById(req.params.id);

        if (transaction) {
            transaction.status = status || transaction.status;
            transaction.txId = txId || transaction.txId;

            if (status === 'Approved' && transaction.type === 'Withdrawal') {
                // Logic to deduct balance if not already done
                const user = await User.findById(transaction.user);
                if (user) {
                    user.totalWithdrawn += transaction.amount;
                    user.balance -= transaction.amount;
                    await user.save();
                }
            }

            const updatedTransaction = await transaction.save();
            res.json(updatedTransaction);
        } else {
            res.status(404).json({ message: 'Transaction not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
