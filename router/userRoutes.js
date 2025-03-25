import express from 'express';
import { getUsers, loginUser, registerUser, logoutUser, deleteUser, getUserById, updateUser, getUserProfile, updateUserProfile } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// This route will return user info only if the requester has a valid JWT and is an admin.
router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/auth', loginUser);

router.post("/logout", logoutUser);
router
    .route("/profile")
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

router
    .route("/:id")
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser);

export default router;