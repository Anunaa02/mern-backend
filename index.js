import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import productRoutes from './routes/productsRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import orderRoutes from './routes/orderRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import paypalRoutes from './routes/paypalRoutes.js';
import path from 'path';
import uploadRoutes from './routes/uploadRoutes.js';
import fs from "fs";

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 8001;

// Add this middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: /^http:\/\/localhost(:\d+)?$/,
  credentials: true,
}));

app.disable('strict routing');

app.get ('/', (req, res) => {
  res.send('Hi');
});
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/paypal', paypalRoutes);
app.use('/api/upload', uploadRoutes);

// Serve static files from the uploads folder
const __dirname = path.resolve();
const uploadsDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});