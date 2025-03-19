import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { Request, Response } from 'express';
import UserModel from '../models/userModel.ts';

exports.register = async (req: Request, res: Response) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        const hashedPassword = await bycrypt.hash(password, 10);
        const user = await UserModel.create({ firstname, lastname, email, password: hashedPassword });

        res.status(201).json({ user }).send("User created successfully");
    } catch (error) {
        res.status(400).send("An error occurred while creating the user");
    }
}

exports.login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user || !(await bycrypt.compare(password, user.password))) {
            return res.status(400).send("Invalid credentials");
        }

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }

        const token = jwt.sign(
            { _id: user._id, email },
            process.env.JWT_SECRET, { expiresIn: "2h" }
        );

        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        res.status(200).send("User logged in successfully").json({ user, token });
    }
    catch (error) {
        res.status(400).send("An error occurred while logging in the user");
    }
}

exports.logout = async (_req: Request, res: Response) => {
    res.clearCookie('token');
    res.status(200).send('Logged out successfully');
};