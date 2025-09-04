import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import profileRoutes from './src/routes/profileRoutes.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/profile', profileRoutes);

// Health check
app.get('/health', (req, res) => res.status(200).send('OK'));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
