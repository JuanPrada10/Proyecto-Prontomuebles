import express from 'express';
import {
  getMonthlySales,
  getTopSellingProducts,
  getTopCustomers,
  getSellerPerformance,
} from '../controllers/reportController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.use(admin);

router.get('/monthly-sales', getMonthlySales);
router.get('/top-products', getTopSellingProducts);
router.get('/top-customers', getTopCustomers);
router.get('/seller-performance', getSellerPerformance);

export default router;