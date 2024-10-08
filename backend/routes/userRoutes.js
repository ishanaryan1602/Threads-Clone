import express from 'express';
import { followUnFollowUser, getSuggestedUsers, getUserProfile, loginUser, logoutUser, signinUser, updateUser } from '../controllers/userControllers.js';
import protectRoute from '../middlware/protectRoute.js';

const router = express.Router();

router.get("/profile/:query", getUserProfile);
router.post("/signup", signinUser);
router.get("/suggested", protectRoute, getSuggestedUsers);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/follow/:id",protectRoute,followUnFollowUser)
router.put("/update/:id",protectRoute,updateUser)
 

export default router;  