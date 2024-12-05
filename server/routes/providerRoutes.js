import express from 'express';
import {
  getProviders,
  getProviderById,
  createProvider,
  updateProvider,
  deleteProvider,
} from '../controllers/providerController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getProviders)
  .post(admin, createProvider);

router.route('/:id')
  .get(getProviderById)
  .put(admin, updateProvider)
  .delete(admin, deleteProvider);

export default router;