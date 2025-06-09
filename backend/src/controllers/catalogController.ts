import { Request, Response } from 'express';
import CatalogItem from '../models/CatalogItem';
import mongoose from 'mongoose';

export const createCatalogItem = async (req: Request, res: Response): Promise<void> => {
  const { name, imageUrl, description, homeId } = req.body;

  if (!name || !homeId) {
    res.status(400).json({ message: 'Missing name or home ID' });
    return;
  }

  const catalogItem = await CatalogItem.create({
    name,
    imageUrl,
    description,
    homeId,
    createdBy: req.user._id,
  });

  res.status(201).json(catalogItem);
};

export const getCatalogItemsByHome = async (req: Request, res: Response): Promise<void> => {
  const { homeId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(homeId)) {
    res.status(400).json({ message: 'Invalid home ID' });
    return;
  }

  const items = await CatalogItem.find({ homeId });

  res.json(items);
};

export const deleteCatalogItem = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: 'Invalid catalog item ID' });
    return;
  }

  const item = await CatalogItem.findById(id);
  if (!item) {
    res.status(404).json({ message: 'Catalog item not found' });
    return;
  }

  if (item.createdBy.toString() !== req.user._id.toString()) {
    res.status(403).json({ message: 'Not authorized to delete this item' });
    return;
  }

  await item.deleteOne();

  res.status(200).json({ message: 'Catalog item deleted' });
};
