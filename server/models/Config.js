const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({
    roiRates: {
        type: Map,
        of: new mongoose.Schema({
            rate: Number,
            period: String,
            walletAddress: { type: String, default: '' }
        }),
        default: {}
    }
}, { timestamps: true });

// Ensure we only have one config document
configSchema.statics.getSingleton = async function () {
    let config = await this.findOne().sort({ createdAt: -1 });
    if (!config) {
        // Default Config
        config = await this.create({
            roiRates: {
                USDT: { rate: 3.5, period: 'Daily' },
                DODGE: { rate: 0.66, period: 'Monthly' },
                XRP: { rate: 0.66, period: 'Monthly' },
                ETH: { rate: 0.66, period: 'Monthly' },
                SOL: { rate: 0.83, period: 'Monthly' },
                BNB: { rate: 0.83, period: 'Monthly' },
                BTC: { rate: 1.0, period: 'Monthly' },
            }
        });
    }
    return config;
};

module.exports = mongoose.model('Config', configSchema);
