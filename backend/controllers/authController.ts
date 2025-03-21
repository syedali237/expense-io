import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { Request, Response } from 'express';
import UserModel from '../models/userModel.ts';

const register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { firstName, lastName, email, password } = req.body;
      
      console.log('Received data:', { firstName, lastName, email, password }); 
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        res.status(400).send("Email is already taken.");
        return;
    }
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await UserModel.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
  
      res.status(201).json({ user });
    } catch (error) {
      console.error("Error in registration:", error); // Log the error
      res.status(500).send("An error occurred while creating the user.");
    }
  };
  
const login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
  
      const user = await UserModel.findOne({ email });
  
      if (!user || !(await bcrypt.compare(password, user.password))) {
        res.status(400).send("Invalid credentials");
        return 
      }
  
      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
      }
  
      const token = jwt.sign(
        { _id: user._id, email },
        process.env.JWT_SECRET, { expiresIn: "2h" }
      );
  
      res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
      res.status(200).json({ user, token }); 
      return 
    } catch (error) {
      console.error("Error in login:", error); 
      if (!res.headersSent) {
        res.status(500).send("An error occurred while logging in the user");
      }
    }
  };
  

const logout = async (_req: Request, res: Response) : Promise<void> => {
    res.clearCookie('token');
    res.status(200).send('Logged out successfully');
};

export { register, login, logout };