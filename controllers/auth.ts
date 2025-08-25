import { Request, Response } from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_default_jwt_secret';
if (JWT_SECRET === 'your_default_jwt_secret') {
    console.warn('Warning: JWT_SECRET is not set. Using a default, insecure secret.');
}

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Please provide all required fields.' });
        }

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email or username already exists.' });
        }

        const user = new User({ username, email, password });
        await user.save();

        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to register user.' });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Please provide email and password.' });
        }

        const user = await User.findOne({ email }).select('+password');
        if (!user || !user.password) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        const isMatch = await argon2.verify(user.password, password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Failed to log in.' });
    }
};
