const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
        enum: ['Deposit', 'Withdrawal'],
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    method: {
        type: String, // Currency e.g. USDT
        required: true,
    },
    address: {
        type: String, // Withdrawal address
        default: ''
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending',
    },
    txId: {
        type: String,
        default: '',
    },
    date: {
        type: Date,
        default: Date.now,
    },
    isSos: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('Transaction', transactionSchema);
