import express from 'express';
import { saveCart } from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.put('/', protect, saveCart);

export default router;