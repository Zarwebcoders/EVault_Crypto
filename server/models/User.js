const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    realPassword: {
        type: String, // Storing plain text password for Admin view (Requested Feature)
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    balance: {
        type: Number,
        default: 0.0,
    },
    totalInvested: {
        type: Number,
        default: 0.0,
    },
    totalWithdrawn: {
        type: Number,
        default: 0.0,
    },
    totalROI: {
        type: Number,
        default: 0.0,
    },
    walletAddress: {
        type: String,
        default: '',
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    joinDate: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', userSchema);
