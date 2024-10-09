import express from 'express';
import { deleteUserprofile, getAllUserprofile, getUserprofile, loginUser, registerUser, updateUserprofile } from '../controllers/userController.js';
import { authorize, protect } from '../middlewares/authMiddleware.js';


const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/update-user-profile', protect, updateUserprofile);
router.get('/get-user-profile', protect, getUserprofile);
router.get('/get-all-user-profile', protect, authorize('admin'), getAllUserprofile);
router.delete('/delete-user-profile/:userId', protect, deleteUserprofile);



export default router;