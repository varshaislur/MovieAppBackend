import User from '../models/User.js';
import { uploadToCloudinary } from '../middleware/cloudinaryMiddleware.js'



export const getAllUsers = async (req, res) => {
    try {
        // Retrieve all users from the database
        const users = await User.find({}, '-password'); // Exclude the password field for security

        res.status(200).json({ success: true, users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch users', error });
    }
};

// Get the logged-in user's own profile
export const getOwnProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch profile', error });
    }
};

// Get another user's profile by ID
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch profile', error });
    }
};

// Update the profile picture of the logged-in user
export const updateProfilePicture = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });

        const profileImageUrl = await uploadToCloudinary(req.file.path);

        const user = await User.findByIdAndUpdate(
            req.user.userId, 
            { profilePicture: profileImageUrl }, 
            { new: true }
        );

        res.status(200).json({ success: true, message: 'Profile picture updated', user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update profile picture', error });
    }
};