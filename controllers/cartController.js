import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// @desc    Save user's cart
// @route   PUT /api/cart
// @access  Private
const saveCart = asyncHandler(async (req, res) => {
    const { cartItems } = req.body;

    // req.user is set by the authentication middleware
    const user = await User.findById(req.user._id);

    if (user) {
        user.cart = cartItems;
        const updatedUser = await user.save();
        res.json({
            message: 'Cart saved successfully',
            cart: updatedUser.cart,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

export { saveCart };