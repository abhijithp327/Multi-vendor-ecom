import express from 'express';
import { createVendor, deleteVendor, getAllVendors, getVendorBySlug, updateVendor } from '../controllers/vendorController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create-vendor', protect, createVendor);
router.put('/update-vendor/:vendorId', updateVendor);
router.get('/get-all-vendors', getAllVendors);
router.get('/get-vendor-by-slug/:slug', getVendorBySlug);
router.delete('/delete-vendor/:vendorId', deleteVendor);

export default router;