import express from 'express';
import { loginUser, registerUser } from '../controllers/authController.js';
import { getAllUsers, getOwnProfile, getUserProfile, updateProfilePicture } from '../controllers/userController.js';
import userAuth from '../middleware/userAuth.js';
import upload from '../middleware/multerMiddleware.js';


const router = express.Router();

// Auth routes
router.post('/register', registerUser); // User registration
router.post('/login', loginUser);       // User login

// User routes
router.get('/user/profile', userAuth, getOwnProfile); // Get logged-in user's own profile
router.get('/user/:id', userAuth, getUserProfile);    // Get specific user's profile
router.put('/user/profilePicture', userAuth, upload.single('file'), updateProfilePicture); // Update profile picture
router.get('/user', userAuth, getAllUsers); // Fetch all users

export default router;
