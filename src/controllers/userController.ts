import { Request, Response } from 'express';
import User from '../models/user.js';
import Thought from '../models/thought.js';

// Get all users
export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find();

        res.json(users);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Get a single user
export const getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId)
        .populate('thoughts')
        .populate('friends');

        if (user) {
            res.json({
                user,
                thoughts: user.thoughts,
                friends: user.friends, 
                friendCount: user.friendCount
            });
        } else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Create a new user
export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

// Update a user
export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId }, // Query based on the user ID passed in the request paramaters
            { $set: req.body }, // Update the fields in the user document with the request body data
            { runValidators: true, new: true } // Run validation and return the updated document
        );
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }

        res.json(user)
    } catch (error: any) {
        res.status(400).json({
            message: error.message
        });
    }
};

// Delete a user
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });

        if (!user) {
            res.status(404).json({ message: 'User not found' 
            });
            return;
        }
        
        // Remove user's associated thoughts
        await Thought.deleteMany({ _id: { $in: user.thoughts } });

        res.json({ message: 'User and associated thoughts deleted' });
        return;
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
        return;
    }
}

// Add a friend
export const addFriend = async (req: Request, res: Response) => {
    const { userId, friendId } = req.params;

    try {
        // Find the user and add the friend to their friends array
        const user = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { friends: friendId } },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.json(user);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

// Remove a friend

export const removeFriend = async (req: Request, res: Response) => {
    const { userId, friendId } = req.params;

    try {
        // Find the user and remove the friend from their friends array
        const user = await User.findByIdAndUpdate(
            userId,
            { $pull: { friends: friendId } }, // $pull removes the friend from the friends array
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.json({ message: 'Friend removed successfully', user });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};