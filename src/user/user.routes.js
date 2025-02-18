import { Router } from "express";
import { updateProfileValidator, updateProfilePictureValidator, updatePasswordValidator } from "../middlewares/user-validators.js";
import { updateProfile, updateProfilePicture, updatePassword } from "./user.controller.js";
import { uploadProfilePicture } from "../middlewares/multer-uploads.js";
import { deleteFileOnError } from "../middlewares/delete-file-on-error.js";
const router = Router();

router.put(
    "/updateProfile", 
    updateProfileValidator, 
    updateProfile
)

router.patch(
    "/updateProfilePicture",
    updateProfilePictureValidator,
    uploadProfilePicture.single("profilePicture"),
    updateProfilePicture
)

router.patch(
    "/updatePassword",
    updatePasswordValidator,
    updatePassword
)

export default router;

