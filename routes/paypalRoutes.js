import express from 'express';
import dotenv from 'dotenv';
import { protect } from '../middleware/authMiddleware.js';

dotenv.config();
const router = express.Router();

router.get('/config', protect, (req, res) => {
  res.json({
    clientId: process.env.PAYPAL_CLIENT_ID 
  });
});

export default router;