import express from 'express';
import { approveReview, createReview, deleteReview, getAllReview, getAReview, updateReview } from '../controllers/reviewController.js';
import { protect } from '../middlewares/authMiddleware.js';



const router = express.Router();

router.post('/create-review', protect, createReview);
router.put('/update-review/:reviewId', protect, updateReview);
router.put('/approve-review/:reviewId', approveReview);
router.get('/get-review/:reviewId', getAReview);
router.get('/get-all-reviews', getAllReview);
router.delete('/delete-review/:reviewId', protect, deleteReview);


export default router;