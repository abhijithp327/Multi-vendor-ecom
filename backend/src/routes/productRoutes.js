import express from 'express';
import { createProduct, deleteProduct, getAllProduct, getProductBySlug, updateProduct } from '../controllers/productController.js';
import { authorize, protect } from '../middlewares/authMiddleware.js';


const router = express.Router();


router.post('/create-product', protect, authorize('admin'), createProduct);
router.put('/update-product/:productId', protect, authorize('admin'), updateProduct);
router.get('/get-all-products',  getAllProduct);
router.get('/get-product-by-slug/:slug', getProductBySlug);
router.delete('/delete-product/:productId', protect, authorize('admin'), deleteProduct);


export default router;