import express from 'express';
import { 
    getProducts, 
    getProductById, 
    updateProduct, 
    deleteProduct, 
    createProductReview, 
    getTopProducts,
    createProduct,
    updateProductStock
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

const router = express.Router();

// Get all products
router.route('/')
    .get(getProducts)
    .post(protect, admin, createProduct);

// Create a review for a product
router.route('/:id/reviews')
    .post(protect, createProductReview);

// Get top rated products
router.get('/top', getTopProducts);

// Add this new route
router.route('/updateStock')
    .put(protect, updateProductStock);

// Single product routes with object id validation
router.route('/:id')
    .get(checkObjectId, getProductById)
    .put(protect, admin, checkObjectId, updateProduct)
    .delete(protect, admin, checkObjectId, deleteProduct);

export default router;