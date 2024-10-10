import express from 'express';
import { createWishlist, deleteWishlist, getAllWishlist, getAWishlist, updateWishlist } from '../controllers/wishlistController.js';



const router = express.Router();


router.post('/create-wishlist', createWishlist);
router.delete('/update-wishlists/:wishlistId', updateWishlist);
router.get('/get-wishlist/:wishlistId', getAWishlist);
router.get('/get-all-wishlists', getAllWishlist);
router.delete('/delete-wishlists', deleteWishlist);


export default router;

