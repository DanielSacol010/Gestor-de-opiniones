import { Router } from "express";
import { updateProfileValidator, updateProfilePictureValidator, updatePasswordValidator } from "../middlewares/user-validators.js";
import { updateProfile, updateProfilePicture, updatePassword } from "./user.controller.js";
import { uploadProfilePicture } from "../middlewares/multer-uploads.js";
import { deleteFileOnError } from "../middlewares/delete-file-on-error.js";
const router = Router();

/**
 * @swagger
 * /updateProfile:
 *   put:
 *     summary: Update user profile
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's new username
 *                 example: newusername
 *               email:
 *                 type: string
 *                 description: The user's new email
 *                 example: newemail@example.com
 *     responses:
 *       200:
 *         description: User has been updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User has been updated
 *                 user:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                       example: newusername
 *                     email:
 *                       type: string
 *                       example: newemail@example.com
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid input
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User update failed
 *                 error:
 *                   type: string
 *                   example: Internal server error
 *     security:
 *       - bearerAuth: []
 *     x-roles:
 *       - USER_ROLE
 *       - ADMIN_ROLE
 */

router.put(
    "/updateProfile", 
    updateProfileValidator, 
    updateProfile
)

/**
 * @swagger
 * /updateProfilePicture:
 *   patch:
 *     summary: Update user profile picture
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *                 description: The user's new profile picture
 *     responses:
 *       200:
 *         description: Profile picture updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: Profile picture updated
 *                 user:
 *                   type: object
 *                   properties:
 *                     profilePicture:
 *                       type: string
 *                       example: newprofile.jpg
 *       400:
 *         description: No user profile picture provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: No user profile picture provided
 *       500:
 *         description: Error updating user profile picture
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: Error updating user profile picture
 *                 error:
 *                   type: string
 *                   example: Internal server error
 *     security:
 *       - bearerAuth: []
 *     x-roles:
 *       - USER_ROLE
 *       - ADMIN_ROLE
 */

router.patch(
    "/updateProfilePicture",
    updateProfilePictureValidator,
    uploadProfilePicture.single("profilePicture"),
    updateProfilePicture
)

/**
 * @swagger
 * /updatePassword:
 *   patch:
 *     summary: Update user password
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 description: The user's old password
 *                 example: oldpassword123
 *               newPassword:
 *                 type: string
 *                 description: The user's new password
 *                 example: newpassword123
 *     responses:
 *       200:
 *         description: Password updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Password updated
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid input
 *       500:
 *         description: Error updating password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Error updating password
 *                 error:
 *                   type: string
 *                   example: Internal server error
 *     security:
 *       - bearerAuth: []
 *     x-roles:
 *       - USER_ROLE
 *       - ADMIN_ROLE
 */

router.patch(
    "/updatePassword",
    updatePasswordValidator,
    updatePassword
)

export default router;

