const express = require('express');
const { registerUser, loginUser, getUserProfile, updateUserProfile, getUsers, addTestFunds, forgotPassword } = require('../controllers/authController.js');
const { protect } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.put('/profile/funds', protect, addTestFunds);
router.get('/users', protect, getUsers); // Should serve as /api/auth/users

module.exports = router;
