import express from 'express';
import { createBrand, deleteBrand, getAllBrand, getBrandBySlug, updateBrand } from '../controllers/brandController.js';
import { authorize, protect } from '../middlewares/authMiddleware.js';


const router = express.Router();


router.post('/create-brand', protect, authorize('admin'), createBrand);
router.put('/update-brand/:brandId', protect, authorize('admin'), updateBrand);
router.get('/get-all-brands', getAllBrand);
router.get('/get-brand-by-slug/:slug', getBrandBySlug);
router.delete('/delete-brand/:brandId', protect, authorize('admin'), deleteBrand);


export default router;