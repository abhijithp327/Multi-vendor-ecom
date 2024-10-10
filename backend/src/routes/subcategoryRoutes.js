import express from 'express';
import { createSubCategory, deleteSubCategory, getAllSubCategory, getSubCategoryBySlug, updateSubCategory } from '../controllers/subCategoryController.js';
import { authorize, protect } from '../middlewares/authMiddleware.js';


const router = express.Router();


router.post('/create-subcategory', protect, authorize('admin'), createSubCategory);
router.put('/update-subcategory/:subcategoryId', protect, authorize('admin'), updateSubCategory);
router.get('/get-all-subcategories', getAllSubCategory);
router.get('/get-subcategory-by-slug/:slug', getSubCategoryBySlug);
router.delete('/delete-subcategory/:subcategoryId', protect, authorize('admin'), deleteSubCategory);


export default router;