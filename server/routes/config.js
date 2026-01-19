const express = require('express');
const router = express.Router();
const Config = require('../models/Config');
const { protect, admin } = require('../middleware/authMiddleware');

// @desc    Get system configuration (ROI rates, etc.)
// @route   GET /api/config
// @access  Public (or Protected? Public needed for users to see rates)
router.get('/', async (req, res) => {
    try {
        const config = await Config.getSingleton();
        res.json(config.toObject({ getters: true, flattenMaps: true }));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Update system configuration
// @route   PUT /api/config
// @access  Private/Admin
router.put('/', protect, admin, async (req, res) => {
    try {
        const { roiRates } = req.body;
        let config = await Config.getSingleton();

        if (roiRates) {
            // Merge existing rates with updates
            // We need to handle Map logic or just replace if sending full object
            // Mongoose Map support can be tricky with partial updates.
            // Let's assume we send the whole 'USDT' object or we update the map carefully

            // If the client sends the FULL object structure for roiRates:
            // config.roiRates = roiRates; 

            // Better approach for granular updates:
            Object.keys(roiRates).forEach(token => {
                let current = config.roiRates.get(token);
                // If it's a Mongoose document, convert to object. If undefined, empty object.
                const currentObj = current && current.toObject ? current.toObject() : (current || {});

                config.roiRates.set(token, { ...currentObj, ...roiRates[token] });
            });
        }

        await config.save();
        res.json(config);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
