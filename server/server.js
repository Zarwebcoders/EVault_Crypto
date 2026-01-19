const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db.js');
// Routes
const authRoutes = require('./routes/auth');
const investmentRoutes = require('./routes/investment');
const transactionRoutes = require('./routes/transaction');
const configRoutes = require('./routes/config');
const newsletterRoutes = require('./routes/newsletter');

// Load env vars
dotenv.config();

// CORS
const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5174', 'https://e-vault-crypto.vercel.app', 'https://e-vault-crypto-backend.vercel.app', 'https://e-vault-crypto-backend.vercel.app/api', 'http://localhost:5000'], // Allow both 5173 and 5174
    methods: 'GET, POST, PUT, DELETE, OPTIONS, HEAD, PATCH, PROPFIND',
    allowedHeaders: ['Content-Type', 'Authorization'],
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

// Debug Middleware to log all requests
app.use((req, res, next) => {
    console.log(`[DEBUG] Request received: ${req.method} ${req.url}`);
    next();
});

// Routes usage
app.use('/api/auth', authRoutes);
app.use('/api/investments', investmentRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/config', configRoutes);
app.use('/api/newsletter', newsletterRoutes);

const PORT = process.env.PORT || 5000;

// restart trigger
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
