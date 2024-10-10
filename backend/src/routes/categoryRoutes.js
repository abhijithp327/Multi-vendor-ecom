import express from 'express';
import { createCategory, deleteCategory, getAllCategory, getCategoryBySlug, updateCategory } from '../controllers/categoryController.js';
import { authorize, protect } from '../middlewares/authMiddleware.js';


const router = express.Router();


router.post('/create-category', protect, authorize('admin'), createCategory);
router.put('/update-category/:categoryId', protect, authorize('admin'), updateCategory);
router.get('/get-all-categories', getAllCategory);
router.get('/get-category-by-slug/:slug', getCategoryBySlug);
router.delete('/delete-category/:categoryId', protect, authorize('admin'), deleteCategory);


export default router;