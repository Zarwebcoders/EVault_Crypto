const Transaction = require('../models/Transaction.js');
const User = require('../models/User.js');
const Investment = require('../models/Investment.js');

// @desc    Request a withdrawal
// @route   POST /api/transactions/withdraw
// @access  Private
const requestWithdrawal = async (req, res) => {
    const { amount, method, address, walletAddress, isSos } = req.body;

    // Strict number conversion
    const amountNum = Number(amount);

    if (isNaN(amountNum) || amountNum <= 0) {
        return res.status(400).json({ message: 'Invalid withdrawal amount' });
    }

    try {
        const user = await User.findById(req.user._id);

        if (isSos) {
            // SOS WITHDRAWAL: Validate against TOTAL INVESTED (Active Investments)
            // Calculate strictly from database to avoid sync issues
            // FILTER BY METHOD (Asset Type)
            const activeInvestments = await Investment.find({ user: req.user._id, status: 'Active', method: method });
            const totalActiveInvested = activeInvestments.reduce((acc, inv) => acc + inv.amount, 0);

            if (amountNum > totalActiveInvested) {
                return res.status(400).json({ message: `Insufficient active investments for SOS. Your Active Total: $${totalActiveInvested}` });
            }

            // NOTE: For SOS, we do NOT deduct balance. 
            // We also do not deduct totalInvested here immediately, as the Admin needs to Process/Terminate the investment manually.

        } else {
            // NORMAL WITHDRAWAL: Validate against BALANCE
            // Strict comparison
            if (user.balance < amountNum) {
                return res.status(400).json({ message: 'Insufficient balance' });
            }

            // Deduct balance IMMEDIATELY for normal withdrawals
            user.balance -= amountNum;
            await user.save();
        }

        const transaction = new Transaction({
            user: req.user._id,
            type: 'Withdrawal',
            amount: amountNum,
            method,
            address: address || walletAddress,
            isSos: isSos || false,
            status: 'Pending',
        });

        const createdTransaction = await transaction.save();

        res.status(201).json(createdTransaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get my withdrawals
// @route   GET /api/transactions
// @access  Private
const getMyTransactions = async (req, res) => {
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
const getAdminTransactions = async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};

        if (search && search.trim()) {
            const searchRegex = new RegExp(search.trim(), 'i');

            // Find users matching name or email first
            const users = await User.find({
                $or: [
                    { name: searchRegex },
                    { email: searchRegex }
                ]
            }).select('_id');

            const userIds = users.map(u => u._id);

            // Build the transaction query
            const orConditions = [
                { address: searchRegex },
                { txId: searchRegex },
                { user: { $in: userIds } }
            ];

            // If search looks like an ObjectId, add it to conditions
            if (search.trim().match(/^[0-9a-fA-F]{24}$/)) {
                orConditions.push({ _id: search.trim() });
            }

            query = { $or: orConditions };
        }

        const transactions = await Transaction.find(query)
            .populate('user', 'id name email')
            .sort({ date: -1 }); // Sort by newest first
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update withdrawal status (Approve/Reject)
// @route   PUT /api/transactions/:id
// @access  Private/Admin
const updateTransaction = async (req, res) => {
    const { status, txId } = req.body;

    try {
        const transaction = await Transaction.findById(req.params.id);

        if (transaction) {
            transaction.status = status || transaction.status;
            transaction.txId = txId || transaction.txId;

            if (status === 'Approved' && transaction.type === 'Withdrawal') {
                if (Boolean(transaction.isSos) === true) {
                    // SOS WITHDRAWAL LOGIC
                    // 1. Deduct from Active Investments (Oldest First)
                    // 2. Reduce User Total Invested
                    // 3. Update Total Withdrawn

                    let remainingToDeduct = Number(transaction.amount);


                    // Find active investments, oldest first
                    // FILTER BY METHOD
                    const investments = await Investment.find({
                        user: transaction.user,
                        status: 'Active',
                        method: transaction.method
                    }).sort({ startDate: 1 });

                    console.log(`[SOS Debug] Found ${investments.length} active ${transaction.method} investments for user ${transaction.user}`);
                    console.log(`[SOS Debug] Amount to deduct: ${remainingToDeduct}`);

                    for (const inv of investments) {
                        if (remainingToDeduct <= 0) break;

                        if (inv.amount <= remainingToDeduct) {
                            // Investment fully used
                            remainingToDeduct -= inv.amount;
                            inv.amount = 0;
                            inv.status = 'Terminated'; // Mark as terminated/used up
                        } else {
                            // Investment partially used
                            inv.amount -= remainingToDeduct;
                            remainingToDeduct = 0;
                        }
                        await inv.save();
                    }

                    // Calculate actual deducted amount (in case user didn't have enough somehow, though validated at request)
                    const actualDeducted = Number(transaction.amount) - remainingToDeduct;

                    console.log(`[SOS Debug] Actual Deducted: ${actualDeducted}, Remaining: ${remainingToDeduct}`);

                    const user = await User.findById(transaction.user);
                    if (user) {
                        // Reduce Invested, Increase Withdrawn
                        // Ensure we don't go below 0
                        user.totalInvested = Math.max(0, user.totalInvested - actualDeducted);
                        user.totalWithdrawn += transaction.amount;
                        await user.save();
                        console.log(`[SOS Debug] User updated. New TotalInvested: ${user.totalInvested}`);
                    }
                } else {
                    // NORMAL WITHDRAWAL LOGIC
                    // Logic: Balance was already deducted at request time.
                    // We just need to update totalWithdrawn.
                    const user = await User.findById(transaction.user);
                    if (user) {
                        user.totalWithdrawn += transaction.amount;
                        // user.balance -= transaction.amount; // ALREADY DEDUCTED
                        await user.save();
                    }
                }
            } else if (status === 'Rejected' && transaction.type === 'Withdrawal') {
                // REFUND LOGIC
                // Only refund if it was NOT an SOS withdrawal (since SOS doesn't deduct balance initially)
                if (!transaction.isSos) {
                    const user = await User.findById(transaction.user);
                    if (user) {
                        user.balance += transaction.amount; // REFUND NORMAL WITHDRAWAL
                        await user.save();
                    }
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

module.exports = {
    requestWithdrawal,
    getMyTransactions,
    getAdminTransactions,
    updateTransaction
};
