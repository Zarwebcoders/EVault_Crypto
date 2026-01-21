const Investment = require('../models/Investment.js');
const User = require('../models/User.js');
const Transaction = require('../models/Transaction.js');
const roiRates = require('../config/roiRates.js');

// @desc    Create new investment request
// @route   POST /api/investments
// @access  Private
const createInvestment = async (req, res) => {
    const { amount, method, walletAddress, receiverWalletAddress, network } = req.body;

    try {
        const rateInfo = roiRates[method] || { rate: 0, period: 'Monthly' };

        const investment = new Investment({
            user: req.user._id,
            amount,
            method,
            network: method === 'USDT' ? (network || 'TRC') : undefined, // Save network only for USDT
            status: 'Pending',
            walletAddress: walletAddress || '',
            receiverWalletAddress: receiverWalletAddress || '',
            roiRate: rateInfo.rate,
            roiPeriod: rateInfo.period
        });

        const createdInvestment = await investment.save();
        res.status(201).json(createdInvestment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get logged in user investments
// @route   GET /api/investments
// @access  Private
const getMyInvestments = async (req, res) => {
    try {
        const investments = await Investment.find({ user: req.user._id });
        res.json(investments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all investment requests (Admin)
// @route   GET /api/investments/admin
// @access  Private/Admin
const getAdminInvestments = async (req, res) => {
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

            // Build the investment query
            const orConditions = [
                { walletAddress: searchRegex },
                { user: { $in: userIds } }
            ];

            // If search looks like an ObjectId, add it to conditions
            if (search.trim().match(/^[0-9a-fA-F]{24}$/)) {
                orConditions.push({ _id: search.trim() });
            }

            query = { $or: orConditions };
        }

        const investments = await Investment.find(query)
            .populate('user', 'id name email')
            .sort({ createdAt: -1 }); // Sort by newest first by default

        res.json(investments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update investment (Approve/Reject/Edit Wallet)
// @route   PUT /api/investments/:id
// @access  Private/Admin
const updateInvestment = async (req, res) => {
    const { status, walletAddress, receiverWalletAddress } = req.body;

    try {
        const investment = await Investment.findById(req.params.id);

        if (investment) {
            investment.status = status || investment.status;
            // Only update wallet addresses if provided (typically Admin edits receiver)
            if (walletAddress !== undefined) investment.walletAddress = walletAddress;
            if (receiverWalletAddress !== undefined) investment.receiverWalletAddress = receiverWalletAddress;

            // If approving, ensure startDate is set to now if not already set or logical
            if (status === 'Active' && investment.status !== 'Active') {
                investment.startDate = Date.now();
                investment.lastClaimedAt = Date.now(); // Reset claim timer on activation
            }

            const updatedInvestment = await investment.save();
            res.json(updatedInvestment);
        } else {
            res.status(404).json({ message: 'Investment not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Claim ROI for an investment
// @route   POST /api/investments/:id/claim
// @access  Private
const claimInvestmentROI = async (req, res) => {
    try {
        const investment = await Investment.findById(req.params.id);

        if (!investment) {
            return res.status(404).json({ message: 'Investment not found' });
        }

        if (investment.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        if (investment.status !== 'Active') {
            return res.status(400).json({ message: 'Investment is not active' });
        }

        const now = Date.now();
        const lastClaim = new Date(investment.lastClaimedAt).getTime();
        const diffMs = now - lastClaim;

        // Determine Period in MS
        const periodDays = investment.roiPeriod === 'Daily' ? 1 : 30;
        const periodMs = periodDays * 24 * 60 * 60 * 1000;

        // Calculate Periods Passed
        const periodsPassed = Math.floor(diffMs / periodMs);

        // Check if claim is available
        if (periodsPassed < 1) {
            const timeRemaining = periodMs - diffMs;
            const hours = Math.ceil(timeRemaining / (1000 * 60 * 60));
            return res.status(400).json({
                message: `ROI not available yet. Please wait ${hours} more hour(s).`,
                nextClaimTime: lastClaim + periodMs
            });
        }

        // Calculate Accumulated Profit
        const profitPerPeriod = investment.amount * (investment.roiRate / 100);
        const claimableAmount = profitPerPeriod * periodsPassed;

        if (claimableAmount <= 0) {
            return res.status(400).json({ message: 'Invalid claim amount' });
        }

        // Update Investment with PRECISE time tracking
        // Instead of resetting to 'now', we add the exact time for the periods claimed.
        // This prevents "time slippage" and ensures the user doesn't lose seconds/minutes.
        investment.returns += claimableAmount;
        investment.totalClaimed += claimableAmount;
        investment.lastClaimedAt = new Date(lastClaim + (periodsPassed * periodMs));
        await investment.save();

        // Update User Balance
        const user = await User.findById(req.user.id);
        user.balance += claimableAmount;
        user.totalROI += claimableAmount;
        await user.save();

        // Create Transaction
        await Transaction.create({
            user: req.user.id,
            type: 'Deposit',
            amount: claimableAmount,
            method: `ROI Claim (${periodsPassed} periods) - ` + investment.method,
            status: 'Approved',
            txId: 'ROI-' + Math.random().toString(36).substr(2, 9)
        });

        res.json({
            message: `Successfully claimed ${periodsPassed} period(s) of ROI!`,
            claimedAmount: claimableAmount,
            newBalance: user.balance,
            investment
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createInvestment,
    getMyInvestments,
    getAdminInvestments,
    updateInvestment,
    claimInvestmentROI
};
