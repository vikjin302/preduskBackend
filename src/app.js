// app.js
import express from 'express';
import cors from 'cors';
import profileRoutes from './routes/profileRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/profile', profileRoutes);

// Health check
app.get('/health', (req, res) => res.status(200).send('OK'));

export default app;


