const express = require('express');
const { registerUser, loginUser, getUserProfile, getUsers, addTestFunds } = require('../controllers/authController.js');
const { protect } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.put('/profile/funds', protect, addTestFunds);
router.get('/users', protect, getUsers); // Should serve as /api/auth/users

module.exports = router;
