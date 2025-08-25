import { Request, Response } from 'express';
import { Types } from 'mongoose';
import User from '../models/user';
import Food from '../models/index';

export const addFavorite = async (req: Request, res: Response) => {
    try {
        const { foodId } = req.body;
        const user = req.user;

        if (!user) {
            return res.status(401).json({ error: 'Not authorized' });
        }

        const food = await Food.findById(foodId);
        if (!food) {
            return res.status(404).json({ error: 'Food not found' });
        }

        const userWithFavorites = await User.findById(user._id);
        if (!userWithFavorites) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (userWithFavorites.favorites.includes(foodId)) {
            return res.status(400).json({ error: 'Food already in favorites' });
        }

        userWithFavorites.favorites.push(foodId);
        await userWithFavorites.save();

        res.status(200).json({ message: 'Food added to favorites' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add favorite' });
    }
};

export const removeFavorite = async (req: Request, res: Response) => {
    try {
        const { foodId } = req.params;
        const user = req.user;

        if (!user) {
            return res.status(401).json({ error: 'Not authorized' });
        }

        const userWithFavorites = await User.findById(user._id);
        if (!userWithFavorites) {
            return res.status(404).json({ error: 'User not found' });
        }

        userWithFavorites.favorites = userWithFavorites.favorites.filter(
            (id: Types.ObjectId) => id.toString() !== foodId
        );
        await userWithFavorites.save();

        res.status(200).json({ message: 'Food removed from favorites' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove favorite' });
    }
};

export const getFavorites = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ error: 'Not authorized' });
        }

        const userWithFavorites = await User.findById(user._id).populate('favorites');
        if (!userWithFavorites) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(userWithFavorites.favorites);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get favorites' });
    }
};
