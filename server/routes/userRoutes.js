import express from 'express';
import {
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.route('/')
    .get(getUser)
    .post(createUser);
    
router.route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);
    
export default router;