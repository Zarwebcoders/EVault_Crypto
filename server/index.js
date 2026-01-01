import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import path from 'path';
import { fileURLToPath } from 'url';

// Load Config
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Basic Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Import Routes
import authRoutes from './routes/auth.js';
import investmentRoutes from './routes/investment.js';
import transactionRoutes from './routes/transaction.js';

app.use('/api/auth', authRoutes);
app.use('/api/investments', investmentRoutes);
app.use('/api/transactions', transactionRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
