import mongoose from 'mongoose';

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
        type: String, // Address used for deposit/reference
        default: ''
    },
    startDate: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Investment', investmentSchema);
