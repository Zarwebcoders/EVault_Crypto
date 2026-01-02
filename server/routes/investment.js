const express = require('express');
const {
    createInvestment,
    getMyInvestments,
    getAdminInvestments,
    updateInvestment,
} = require('../controllers/investmentController.js');
const { protect } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.route('/')
    .post(protect, createInvestment)
    .get(protect, getMyInvestments);

router.route('/admin')
    .get(protect, getAdminInvestments); // Add admin middleware in real app

router.route('/:id')
    .put(protect, updateInvestment);

module.exports = router;
