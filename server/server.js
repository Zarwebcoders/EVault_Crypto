const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db.js');
const authRoutes = require('./routes/auth.js');
const investmentRoutes = require('./routes/investment.js');
const transactionRoutes = require('./routes/transaction.js');

// Load env vars
dotenv.config();

// CORS
const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5174', 'https://prescripto-frontend-xi-three.vercel.app', 'https://prescripto-admin-opal.vercel.app', 'http://192.168.1.8:5174'], // Allow both 5173 and 5174
    methods: 'GET, POST, PUT, DELETE, OPTIONS, HEAD, PATCH, PROPFIND',
    credentials: true
}

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// Basic Route
app.get('/', (req, res) => {
    res.send('EVault Crypto API is running...');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/investments', investmentRoutes);
app.use('/api/transactions', transactionRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
