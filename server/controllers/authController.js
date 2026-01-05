const User = require('../models/User.js');
const Investment = require('../models/Investment.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user.id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user.id),
                balance: user.balance,
                totalInvested: user.totalInvested,
                totalROI: user.totalROI
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (user) {
            // Calculate Total Invested dynamically
            const investments = await Investment.find({ user: req.user.id });
            const totalInvested = investments.reduce((acc, inv) => acc + (inv.amount || 0), 0);

            const userObj = user.toObject();
            userObj.totalInvested = totalInvested;

            res.json(userObj);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all users (Admin)
// @route   GET /api/auth/users
// @access  Private/Admin
const getUsers = async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};

        if (search && search.trim()) {
            const searchRegex = new RegExp(search.trim(), 'i');
            query = {
                $or: [
                    { name: searchRegex },
                    { email: searchRegex }
                ]
            };
        }

        const users = await User.find(query);

        // Aggregate investments for each user
        const usersWithInvestments = await Promise.all(users.map(async (user) => {
            const investments = await Investment.find({ user: user._id });
            const totalInvested = investments.reduce((acc, inv) => acc + (inv.amount || 0), 0);

            const userObj = user.toObject();
            userObj.totalInvested = totalInvested;
            return userObj;
        }));

        res.json(usersWithInvestments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add test funds (Faucet)
// @route   PUT /api/auth/profile/funds
// @access  Private
const addTestFunds = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (user) {
            user.balance += 1000;
            const updatedUser = await user.save();
            res.json({
                _id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                token: generateToken(updatedUser.id),
                balance: updatedUser.balance,
                totalInvested: updatedUser.totalInvested,
                totalROI: updatedUser.totalROI
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (user) {
            user.name = req.body.name || user.name;
            user.walletAddress = req.body.walletAddress || user.walletAddress;

            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(req.body.password, salt);
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                token: generateToken(updatedUser.id),
                balance: updatedUser.balance,
                totalInvested: updatedUser.totalInvested,
                totalROI: updatedUser.totalROI,
                walletAddress: updatedUser.walletAddress
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    addTestFunds
};
