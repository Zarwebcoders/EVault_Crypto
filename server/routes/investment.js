import express from 'express';
import {
    createInvestment,
    getMyInvestments,
    getAdminInvestments,
    updateInvestment,
} from '../controllers/investmentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(protect, createInvestment)
    .get(protect, getMyInvestments);

router.route('/admin')
    .get(protect, getAdminInvestments); // Add admin middleware in real app

router.route('/:id')
    .put(protect, updateInvestment);

export default router;
