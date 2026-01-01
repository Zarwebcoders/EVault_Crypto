import express from 'express';
import { registerUser, loginUser, getUserProfile, getUsers, addTestFunds } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.put('/profile/funds', protect, addTestFunds);
router.get('/users', protect, getUsers); // Should serve as /api/auth/users

export default router;
