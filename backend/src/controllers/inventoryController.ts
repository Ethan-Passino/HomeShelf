import { Request, Response } from 'express';
import mongoose from 'mongoose';
import InventoryItem from '../models/InventoryItem';

export const addInventoryItem = async (req: Request, res: Response): Promise<void> => {
  const { catalogItemId, quantity, expirationDate, location, homeId } = req.body;

  if (!catalogItemId || !quantity || !location || !homeId) {
    res.status(400).json({ message: 'Missing required fields' });
    return;
  }

  const item = await InventoryItem.create({
    catalogItemId,
    quantity,
    expirationDate,
    location,
    homeId,
  });

  res.status(201).json(item);
};

export const getInventoryByHome = async (req: Request, res: Response): Promise<void> => {
  const { homeId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(homeId)) {
    res.status(400).json({ message: 'Invalid home ID' });
    return;
  }

  const items = await InventoryItem.find({ homeId }).populate('catalogItemId');
  res.json(items);
};

export const updateInventoryItem = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { quantity, expirationDate, location } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: 'Invalid inventory ID' });
    return;
  }

  const item = await InventoryItem.findById(id);
  if (!item) {
    res.status(404).json({ message: 'Inventory item not found' });
    return;
  }

  if (quantity !== undefined) item.quantity = quantity;
  if (expirationDate !== undefined) item.expirationDate = expirationDate;
  if (location !== undefined) item.location = location;

  await item.save();

  res.json(item);
};

export const deleteInventoryItem = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: 'Invalid inventory ID' });
    return;
  }

  const item = await InventoryItem.findById(id);
  if (!item) {
    res.status(404).json({ message: 'Inventory item not found' });
    return;
  }

  await item.deleteOne();
  res.json({ message: 'Inventory item deleted' });
};
