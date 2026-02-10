import express from "express";
import { login,logout,signup ,updateProfile} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login",login);
router.post("/logout",logout);

router.put("/update-profile",protectRoute, updateProfile);             //here we used a protectRoute middlewire to check user is authinticated or not

export default router;

