import express from 'express';
import {
  getFurniture,
  getFurnitureById,
  createFurniture,
  updateFurniture,
  deleteFurniture,
} from '../controllers/furnitureController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getFurniture)
  .post(admin, createFurniture);

router.route('/:id')
  .get(getFurnitureById)
  .put(admin, updateFurniture)
  .delete(admin, deleteFurniture);

export default router;