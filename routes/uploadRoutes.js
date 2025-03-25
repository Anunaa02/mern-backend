import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import { upload, uploadFile } from '../controllers/uploadController.js';

const router = express.Router();

router.post('/', protect, admin, upload.single('image'), uploadFile);

export default router;