import express from 'express'
import { verify } from '../middlewares/verify.middleware.js';
import User from '../models/user.model.js';

const router = express.Router();

router.get('/profile',verify, (req, res) => {
    console.log('Authenticated')
});

router.put('/update-profile', verify, async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Find the user by their ID (you might want to use req.user.id if available)
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update user details
        user.username = username;
        user.email = email;
        user.password = password;

        // Save the updated user
        await user.save();

        res.status(200).json({ message: 'User details updated successfully' });
    } catch (error) {
        console.error('Error updating user details', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;