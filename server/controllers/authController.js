const User = require('../models/User.js');
const Investment = require('../models/Investment.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

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

        const verificationToken = crypto.randomBytes(20).toString('hex');
        // Hash and set to verificationToken field
        const verificationTokenHash = crypto
            .createHash('sha256')
            .update(verificationToken)
            .digest('hex');

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            realPassword: password,
            verificationToken: verificationTokenHash,
            verificationTokenExpire: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
        });

        if (user) {
            // Create verification url
            const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
            const verifyUrl = `${clientUrl}/verify-email/${verificationToken}`;

            const message = `
                <h1>Email Verification</h1>
                <p>Please verify your email address by clicking the link below:</p>
                <a href="${verifyUrl}" clicktracking=off>${verifyUrl}</a>
            `;

            try {
                await sendEmail({
                    email: user.email,
                    subject: 'EVault Crypto - Email Verification',
                    html: message
                });

                res.status(201).json({
                    success: true,
                    message: 'Registration successful! Please check your email to verify your account.'
                });
            } catch (error) {
                // If email fails, delete user? Or keep and let them resend?
                // For now, let's keep user but they can't login without verify.
                console.error(error);
                user.verificationToken = undefined;
                user.verificationTokenExpire = undefined;
                // await user.save({ validateBeforeSave: false }); // Optional: if we wanted to rollback

                res.status(500).json({ message: 'Email could not be sent. Please contact support.' });
            }

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
            if (user.isVerified === false) {
                return res.status(401).json({ message: 'Please verify your email address to login.' });
            }

            if (user.isBlocked) {
                return res.status(403).json({ message: 'Your account has been blocked. Please contact support.' });
            }

            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                isBlocked: user.isBlocked,
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
                user.realPassword = req.body.password;
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


// @desc    Forgot Password
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        user.realPassword = password;

        await user.save();

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user by Admin (Password etc)
// @route   PUT /api/auth/users/:id
// @access  Private/Admin
const updateUserByAdmin = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            // Update other fields if needed
            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(req.body.password, salt);
                user.realPassword = req.body.password;
            }

            if (typeof req.body.isAdmin !== 'undefined') {
                user.isAdmin = req.body.isAdmin;
            }

            const updatedUser = await user.save();
            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isBlocked: updatedUser.isBlocked,
                isAdmin: updatedUser.isAdmin,
                realPassword: updatedUser.realPassword
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Block/Unblock a user (Admin)
// @route   PUT /api/auth/users/:id/block
// @access  Private/Admin
const toggleUserBlockStatus = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            user.isBlocked = !user.isBlocked;
            const updatedUser = await user.save();
            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isBlocked: updatedUser.isBlocked,
                isAdmin: updatedUser.isAdmin
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Verify email
// @route   POST /api/auth/verify-email/:token
// @access  Public
const verifyEmail = async (req, res) => {
    try {
        console.log("Verifying email with token:", req.params.token);
        const verificationToken = crypto
            .createHash('sha256')
            .update(req.params.token)
            .digest('hex');

        console.log("Hashed token:", verificationToken);

        const user = await User.findOne({
            verificationToken
        });

        if (!user) {
            console.log("No user found with this hash:", verificationToken);
            return res.status(400).json({
                message: 'Invalid token (User not found with this hash)',
                debugHash: verificationToken
            });
        }

        if (user.verificationTokenExpire < Date.now()) {
            console.log("Token expired. Expiry:", user.verificationTokenExpire, "Now:", Date.now());
            return res.status(400).json({ message: 'Token expired' });
        }

        console.log("User found:", user.email);

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpire = undefined;

        await user.save();
        console.log("User verified successfully.");

        res.status(200).json({ success: true, message: 'Email verified successfully! You can now login.' });
    } catch (error) {
        console.error("Verification error:", error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Resend Verification Email
// @route   POST /api/auth/resend-verification
// @access  Public
const resendVerificationEmail = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: 'Email already verified' });
        }

        const verificationToken = crypto.randomBytes(20).toString('hex');
        const verificationTokenHash = crypto
            .createHash('sha256')
            .update(verificationToken)
            .digest('hex');

        user.verificationToken = verificationTokenHash;
        user.verificationTokenExpire = Date.now() + 24 * 60 * 60 * 1000;

        await user.save();

        const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
        const verifyUrl = `${clientUrl}/verify-email/${verificationToken}`;
        const message = `
            <h1>Email Verification</h1>
            <p>Please verify your email address by clicking the link below:</p>
            <a href="${verifyUrl}" clicktracking=off>${verifyUrl}</a>
        `;

        await sendEmail({
            email: user.email,
            subject: 'EVault Crypto - Email Verification Link',
            html: message
        });

        res.status(200).json({ success: true, message: 'Verification email resent.' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    registerUser,
    verifyEmail,
    resendVerificationEmail,
    loginUser,
    getUserProfile,
    updateUserProfile,
    getUsers,

    forgotPassword,
    toggleUserBlockStatus,
    updateUserByAdmin
};
