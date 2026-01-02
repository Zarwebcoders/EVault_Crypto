const Investment = require('../models/Investment.js');
const User = require('../models/User.js');

// @desc    Create new investment request
// @route   POST /api/investments
// @access  Private
const createInvestment = async (req, res) => {
    const { amount, method, walletAddress } = req.body;

    try {
        const investment = new Investment({
            user: req.user._id,
            amount,
            method,
            status: 'Pending',
            walletAddress: walletAddress || ''
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
        const investments = await Investment.find({}).populate('user', 'id name email');
        res.json(investments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update investment (Approve/Reject/Edit Wallet)
// @route   PUT /api/investments/:id
// @access  Private/Admin
const updateInvestment = async (req, res) => {
    const { status, walletAddress } = req.body;

    try {
        const investment = await Investment.findById(req.params.id);

        if (investment) {
            investment.status = status || investment.status;
            investment.walletAddress = walletAddress || investment.walletAddress;

            const updatedInvestment = await investment.save();
            res.json(updatedInvestment);
        } else {
            res.status(404).json({ message: 'Investment not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createInvestment,
    getMyInvestments,
    getAdminInvestments,
    updateInvestment
};
