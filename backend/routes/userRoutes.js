import express from 'express';
import { followUnFollowUser, getUserProfile, loginUser, logoutUser, signinUser, updateUser } from '../controllers/userControllers.js';
import protectRoute from '../middlware/protectRoute.js';

const router = express.Router();

router.get("/profile/:username", getUserProfile);
router.post("/signup", signinUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/follow/:id",protectRoute,followUnFollowUser)
router.post("/update/:id",protectRoute,updateUser)
 

export default router;  