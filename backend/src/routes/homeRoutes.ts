import express from 'express';
import {
  createHome,
  getHomesForUser,
  deleteHome,
} from '../controllers/homeController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Create a new home
router.post('/', createHome);

// Get homes for the logged-in user
router.get('/', getHomesForUser);

// Delete a home by ID (only if owner)
router.delete('/:id', deleteHome);

export default router;
