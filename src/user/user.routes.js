import { Router } from "express";
import { updateProfileValidator } from "../middlewares/user-validators.js";
import { updateProfile } from "./user.controller.js";

const router = Router();

router.put(
    "/updateProfile", 
    updateProfileValidator, 
    updateProfile
)

export default router;

