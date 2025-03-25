import express from 'express';
import { 
  addOrderItems, 
  getOrderById, 
  updateOrderToPaid, 
  getMyOrders, 
  getOrders, 
  updateOrderToDelivered 
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create new order & get all orders
router.route('/')
  .post(protect, addOrderItems)
  .get(protect, admin, getOrders);

// Get logged in user orders
router.route('/mine').get(protect, getMyOrders);

// Get order by ID
router.route('/:id').get(protect, getOrderById);

// Update order to paid
router.route('/:id/pay').put(protect, updateOrderToPaid);

// Update order to delivered
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

export default router;