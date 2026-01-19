const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    method: {
        type: String, // e.g., 'USDT', 'BTC'
        required: true,
    },
    network: {
        type: String,
        enum: ['TRC', 'BEP', 'ERC', 'SOL', 'BSC', 'TRC20', 'BEP20'], // Flexible enum
        default: 'TRC'
    },
    status: {
        type: String,
        enum: ['Pending', 'Active', 'Completed'],
        default: 'Pending',
    },
    returns: {
        type: Number,
        default: 0.0,
    },
    walletAddress: {
        type: String, // Address used for deposit/sender reference
        default: ''
    },
    receiverWalletAddress: {
        type: String, // Address to receive returns
        default: ''
    },
    transactionHash: {
        type: String,
        default: ''
    },
    roiRate: {
        type: Number,
        default: 0
    },
    roiPeriod: {
        type: String,
        default: 'Monthly'
    },
    lastClaimedAt: {
        type: Date,
        default: Date.now
    },
    totalClaimed: {
        type: Number,
        default: 0.0
    },
    startDate: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Investment', investmentSchema);
