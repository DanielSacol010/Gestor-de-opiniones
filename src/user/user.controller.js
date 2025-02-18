import { hash, verify } from "argon2";
import User from "./user.model.js";
import fs from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

export const initializeAdmin = async () => {
    try {
        const adminExists = await User.findOne({ role: "ADMIN_ROLE" }); 
        if (!adminExists) {

            const hashedPassword = await hash("Admin123*");

            const adminUser = {
                username: "dsacol10",
                email: "dsacol10@example.com",
                password: hashedPassword,
                profilePicture: "Default.png",
                role: "ADMIN_ROLE"
            };
            const admin = new User(adminUser);
            await admin.save();
            console.log("Admin created successfully");
        } else {
            console.log("Admin already exists");
        }

    } catch (error) {
        console.error("Error creating admin:", error);
    }

};
initializeAdmin();

export const updateProfile = async (req, res) => {
    try {
        const { usuario } = req;
        const data = req.body;

        const user = await User.findByIdAndUpdate(usuario._id,  data, { new: true });

        return res.status(200).json({
            message: "User has been updated",
            user
        });
    } catch (err) {
        return res.status(500).json({
            message: "User update failed",
            error: err.message
        });
    }
}

export const updateProfilePicture = async (req, res) => {
    try {
        const { usuario } = req;
        let newProfilePicture = req.file ? req.file.filename : null;

        if (!newProfilePicture) {
            return res.status(400).json({
                success: false,
                msg: 'No user profile picture provided',
            });
        }

        const user = await User.findById(usuario._id);

        if (user.profilePicture) {
            const oldProfilePicturePath = join(__dirname, "../../public/uploads/profile-pictures", user.profilePicture);
            await fs.unlink(oldProfilePicturePath);
        }

        user.profilePicture = newProfilePicture;
        await user.save();

        res.status(200).json({
            success: true,
            msg: 'Profile picture updated',
            user,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error updating user profile picture',
            error: err.message
        });
    }
};

export const updatePassword = async (req, res) => {
    try {
        const { usuario } = req;
        const { newPassword, oldPassword } = req.body;

        const user = await User.findById(usuario._id);

        const matchOldPassword = await verify(user.password, oldPassword);
        if (!matchOldPassword) {
            return res.status(400).json({
                success: false,
                message: "The old password is incorrect"
            });
        }

        const matchOldAndNewPassword = await verify(user.password, newPassword);

        if (matchOldAndNewPassword) {
            return res.status(400).json({
                success: false,
                message: "The new password cannot be the same as the old one"
            });
        }

        const encryptedPassword = await hash(newPassword);

        await User.findByIdAndUpdate(usuario._id, { password: encryptedPassword }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Password updated",
        });
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            
            success: false,
            message: "Error updating password",
            error: err.message
        });
    }
};

