import express from 'express';
import {
    addInventoryItem,
    getInventoryByHome,
    updateInventoryItem,
    deleteInventoryItem,
} from '../controllers/inventoryController'

import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// All routes require auth
router.use(protect);

// Add a new inventory item
router.post('/', addInventoryItem);

// Get all inventory items for a specific home
router.get('/:homeId', getInventoryByHome);

// Update an inventory item by ID
router.patch('/:id', updateInventoryItem);

// Delete an inventory item by ID
router.delete('/:id', deleteInventoryItem);

export default router;