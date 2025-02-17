import { hash, verify } from "argon2";
import User from "./user.model.js";

import { join, dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

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