import express from 'express';
import {
  createCatalogItem,
  getCatalogItemsByHome,
  deleteCatalogItem,
} from '../controllers/catalogController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// All catalog routes require authentication
router.use(protect);

// POST /api/catalog — Create a new catalog item
router.post('/', createCatalogItem);

// GET /api/catalog/home/:homeId — Get catalog items for a specific home
router.get('/home/:homeId', getCatalogItemsByHome);

// DELETE /api/catalog/:id — Delete a specific catalog item
router.delete('/:id', deleteCatalogItem);

export default router;
