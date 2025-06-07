import { Request, Response } from 'express';
import Home from '../models/Home';
import User from '../models/User';
import mongoose from 'mongoose';

export const createHome = async (req: Request, res: Response): Promise<void> => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ message: 'Home name is required' });
    return;
  }

  const home = await Home.create({
    name,
    owner: req.user._id,
    invitedUsers: [],
  });

  // Optionally update the user with this new home
  await User.findByIdAndUpdate(req.user._id, {
    $push: { homes: home._id },
  });

  res.status(201).json(home);
};

export const getHomesForUser = async (req: Request, res: Response): Promise<void> => {
  const homes = await Home.find({
    $or: [
      { owner: req.user._id },
      { invitedUsers: req.user._id },
    ],
  });

  res.json(homes);
};

export const deleteHome = async (req: Request, res: Response): Promise<void> => {
  const homeId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(homeId)) {
    res.status(400).json({ message: 'Invalid home ID' });
    return;
  }

  const home = await Home.findById(homeId);

  if (!home) {
    res.status(404).json({ message: 'Home not found' });
    return;
  }

  if (home.owner.toString() !== req.user._id.toString()) {
    res.status(403).json({ message: 'Not authorized to delete this home' });
    return;
  }

  await home.deleteOne();

  res.status(200).json({ message: 'Home deleted' });
};
