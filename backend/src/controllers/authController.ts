import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: '30d',
  });
};

export const registerUser = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  if (!email || !password) return res.status(400).json({ message: 'Missing email or password' });

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashedPassword,
    name,
  }) as IUser;

  res.status(201).json({
    _id: user._id,
    email: user.email,
    name: user.name,
    token: generateToken((user._id as unknown as string)),
  });
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  res.json({
    _id: user._id,
    email: user.email,
    name: user.name,
    token: generateToken((user._id as unknown as string)),
  });
};
